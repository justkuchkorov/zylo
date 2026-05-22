var SELECT_SEARCH_TIMEOUT = 760;

function enhanceSelects() {
  document.querySelectorAll(".fields select").forEach((select) => {
    if (select.dataset.enhanced === "true") return;

    select.dataset.enhanced = "true";
    select.tabIndex = -1;
    select.hidden = true;
    select.setAttribute("aria-hidden", "true");
    select.classList.add("select-native");

    const shell = document.createElement("div");
    const compact = ["tripLength", "stopLength"].includes(select.id);
    shell.className = "select-shell";
    if (compact) shell.classList.add("select-shell--compact");
    if (isSearchableSelect(select)) shell.classList.add("select-shell--searchable");
    const button = document.createElement("button");
    button.className = "select-button";
    button.type = "button";
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    const mobileInput = isSearchableSelect(select) ? document.createElement("input") : null;
    const mobileFlag = isSearchableSelect(select) ? document.createElement("span") : null;
    const mobileBadge = isSearchableSelect(select) ? document.createElement("span") : null;
    const mobileCaret = isSearchableSelect(select) ? document.createElement("span") : null;
    if (mobileInput) {
      mobileInput.className = "select-mobile-input";
      mobileInput.type = "search";
      mobileInput.autocomplete = "off";
      mobileInput.spellcheck = false;
      mobileInput.setAttribute("aria-label", `${selectLabelText(select)} city`);
      mobileInput.setAttribute("aria-haspopup", "listbox");
      mobileInput.setAttribute("aria-expanded", "false");
      mobileFlag.className = "select-mobile-flag";
      mobileBadge.className = "select-mobile-badge";
      mobileCaret.className = "select-mobile-caret";
      mobileCaret.setAttribute("aria-hidden", "true");
      select._mobileInput = mobileInput;
      select._mobileFlag = mobileFlag;
      select._mobileBadge = mobileBadge;
      select._mobileCaret = mobileCaret;
    }
    const menu = document.createElement("div");
    menu.className = compact ? "select-menu select-menu--compact" : "select-menu";
    menu.hidden = true;
    menu.tabIndex = -1;
    menu.setAttribute("role", "listbox");
    select._customMenu = menu;

    select.before(shell);
    shell.append(select, button);
    if (mobileInput) shell.append(mobileInput, mobileFlag, mobileBadge, mobileCaret);
    document.body.append(menu);
    buildCustomSelectMenu(select);
    syncCustomSelect(select);

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleCustomSelect(select);
    });

    button.addEventListener("keydown", (event) => {
      if (isSelectSearchKey(event) && isSearchableSelect(select)) {
        event.preventDefault();
        openCustomSelect(select);
        handleCustomSelectSearch(event, select);
        return;
      }

      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openCustomSelect(select);
        focusCustomOption(select, event.key === "ArrowUp" ? -1 : 1);
      }
    });

    menu.addEventListener("click", (event) => {
      event.stopPropagation();
      const option = event.target.closest(".select-option");
      if (!option) return;
      chooseCustomSelectOption(select, option.dataset.value);
    });

    menu.addEventListener("keydown", (event) => handleCustomSelectKeydown(event, select));
    if (mobileInput) {
      mobileInput.addEventListener("click", (event) => {
        event.stopPropagation();
        openCustomSelect(select, { mobileInput: true });
      });
      mobileInput.addEventListener("focus", () => {
        openCustomSelect(select, { mobileInput: true });
        requestAnimationFrame(() => mobileInput.select());
      });
      mobileInput.addEventListener("input", () => {
        openCustomSelect(select, { mobileInput: true, keepSearch: true });
        select._searchState = { text: normalizeSelectSearch(mobileInput.value), time: Date.now() };
        applyCustomSelectSearch(select, mobileInput.value);
      });
      mobileInput.addEventListener("keydown", (event) => handleMobileSelectInputKeydown(event, select));
    }
    select.addEventListener("change", () => syncCustomSelect(select));
  });

  document.addEventListener("click", () => closeCustomSelects());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCustomSelects();
  });
  window.addEventListener("resize", positionOpenCustomSelects);
  window.addEventListener("scroll", positionOpenCustomSelects, true);
}

function buildCustomSelectMenu(select) {
  const menu = customSelectMenu(select);
  menu.innerHTML = "";
  if (isSearchableSelect(select)) {
    const search = document.createElement("input");
    search.className = "select-search";
    search.type = "search";
    search.placeholder = "Search city";
    search.autocomplete = "off";
    search.spellcheck = false;
    search.setAttribute("aria-label", "Search cities");
    search.addEventListener("input", () => {
      select._searchState = { text: normalizeSelectSearch(search.value), time: Date.now() };
      applyCustomSelectSearch(select, search.value);
    });
    menu.append(search);
    select._customSearch = search;
  } else {
    select._customSearch = null;
  }
  Array.from(select.options).forEach((option) => {
    const meta = selectOptionMeta(option);
    const row = document.createElement("button");
    row.className = "select-option";
    row.type = "button";
    row.dataset.value = option.value;
    row.dataset.search = selectOptionSearch(option, meta);
    row.setAttribute("role", "option");
    row.innerHTML = `
      <span>
        <strong>${meta.labelHtml || escapeHtml(option.text)}</strong>
        <small>${meta.description}</small>
      </span>
      <i>${meta.badge}</i>
    `;
    menu.append(row);
  });
  const empty = document.createElement("div");
  empty.className = "select-empty";
  empty.hidden = true;
  empty.textContent = "No matching city";
  menu.append(empty);
}

function syncCustomSelect(select) {
  const shell = select.closest(".select-shell");
  if (!shell) return;

  const selected = select.selectedOptions[0];
  const button = shell.querySelector(".select-button");
  const menu = customSelectMenu(select);
  const meta = selectOptionMeta(selected);
  button.innerHTML = `
    <span>${meta.labelHtml || escapeHtml(selected.text)}</span>
    <small>${meta.badge}</small>
    <i aria-hidden="true"></i>
  `;
  syncMobileSelectInput(select, selected, meta);
  menu.querySelectorAll(".select-option").forEach((option) => {
    const active = option.dataset.value === select.value;
    option.classList.toggle("is-selected", active);
    option.setAttribute("aria-selected", String(active));
  });
}

function refreshCustomSelect(select) {
  syncCustomSelect(select);
}

function selectOptionMeta(option) {
  if (["tripLength", "stopLength"].includes(option.parentElement?.id)) {
    return {
      badge: option.value === "7" ? "1w" : `${option.value}d`,
      description: option.parentElement?.id === "stopLength" ? "Stop time" : "Duration",
    };
  }
  const cityItem = cities.find((item) => item.name === option.value);
  if (cityItem) {
    return {
      labelHtml: cityLabelHtml(cityItem.name),
      badge: cityCode(cityItem.name),
      description: `${cityItem.country} · ${cityItem.airports.join(", ")}`,
    };
  }
  if (option.value === "Anywhere") return { badge: "Flex", description: "Let the cheapest city win" };
  return { badge: "Stay", description: "Trip length" };
}

function selectOptionSearch(option, meta) {
  const cityItem = cities.find((item) => item.name === option.value);
  if (cityItem) {
    return normalizeSelectSearch(`${cityItem.name} ${cityItem.country} ${cityItem.airports.join(" ")} ${cityCode(cityItem.name)}`);
  }
  if (option.value === "Anywhere") {
    return normalizeSelectSearch("anywhere cheap flexible flex cheapest budget surprise");
  }
  return normalizeSelectSearch(`${option.text} ${option.value} ${meta.badge || ""} ${meta.description || ""}`);
}

function toggleCustomSelect(select) {
  const shell = select.closest(".select-shell");
  if (shell.classList.contains("is-open")) {
    closeCustomSelect(select);
  } else {
    openCustomSelect(select);
  }
}

function openCustomSelect(select, options = {}) {
  closeCustomSelects(select);
  const shell = select.closest(".select-shell");
  const menu = customSelectMenu(select);
  if (!options.keepSearch) resetCustomSelectSearch(select);
  shell.classList.add("is-open");
  menu.hidden = false;
  menu.classList.toggle("is-mobile-proxy", Boolean(options.mobileInput));
  shell.querySelector(".select-button").setAttribute("aria-expanded", "true");
  select._mobileInput?.setAttribute("aria-expanded", "true");
  positionCustomSelectMenu(select);
  if (isSearchableSelect(select) && !options.mobileInput) {
    requestAnimationFrame(() => select._customSearch?.focus({ preventScroll: true }));
  }
}

function closeCustomSelect(select) {
  const shell = select.closest(".select-shell");
  const menu = customSelectMenu(select);
  if (!shell) return;
  shell.classList.remove("is-open");
  resetCustomSelectSearch(select);
  menu.hidden = true;
  menu.classList.remove("is-mobile-proxy");
  shell.querySelector(".select-button").setAttribute("aria-expanded", "false");
  select._mobileInput?.setAttribute("aria-expanded", "false");
  syncMobileSelectInput(select, select.selectedOptions[0], selectOptionMeta(select.selectedOptions[0]));
}

function closeCustomSelects(exceptSelect) {
  document.querySelectorAll(".select-native").forEach((select) => {
    if (select !== exceptSelect) closeCustomSelect(select);
  });
}

function chooseCustomSelectOption(select, value) {
  select.value = value;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  requestAnimationFrame(() => routeMap?.invalidateSize());
  closeCustomSelect(select);
  const focusTarget = mobileSelectInputIsVisible(select) ? select._mobileInput : select.closest(".select-shell").querySelector(".select-button");
  focusTarget?.focus({ preventScroll: true });
}

function focusCustomOption(select, direction) {
  const options = visibleCustomOptions(select);
  if (!options.length) return;
  const current = options.indexOf(document.activeElement);
  const selected = options.findIndex((option) => option.dataset.value === select.value);
  const start = current >= 0 ? current : Math.max(0, selected);
  const index = direction < 0 ? Math.max(0, start - 1) : Math.min(options.length - 1, start + 1);
  options[index]?.focus();
}

function handleCustomSelectKeydown(event, select) {
  if (event.target?.classList?.contains("select-search")) {
    if (event.key === "Escape") {
      closeCustomSelect(select);
      select.closest(".select-shell").querySelector(".select-button").focus();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      visibleCustomOptions(select)[0]?.focus();
    }
    return;
  }

  if (isSelectSearchKey(event) && isSearchableSelect(select)) {
    event.preventDefault();
    handleCustomSelectSearch(event, select);
    return;
  }

  if (!["ArrowDown", "ArrowUp", "Enter", " ", "Escape"].includes(event.key)) return;
  event.preventDefault();

  if (event.key === "Escape") {
    closeCustomSelect(select);
    select.closest(".select-shell").querySelector(".select-button").focus();
    return;
  }

  const options = visibleCustomOptions(select);
  const current = options.indexOf(document.activeElement);
  if (event.key === "ArrowDown") options[Math.min(options.length - 1, current + 1)]?.focus();
  if (event.key === "ArrowUp") options[Math.max(0, current - 1)]?.focus();
  if (["Enter", " "].includes(event.key) && document.activeElement?.classList.contains("select-option")) {
    chooseCustomSelectOption(select, document.activeElement.dataset.value);
  }
}

function handleMobileSelectInputKeydown(event, select) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeCustomSelect(select);
    select._mobileInput?.blur();
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    openCustomSelect(select, { mobileInput: true, keepSearch: true });
    visibleCustomOptions(select)[0]?.focus({ preventScroll: true });
    return;
  }

  if (event.key === "Enter") {
    const options = visibleCustomOptions(select);
    if (options.length === 1) {
      event.preventDefault();
      chooseCustomSelectOption(select, options[0].dataset.value);
    }
  }
}

function handleCustomSelectSearch(event, select) {
  const now = Date.now();
  const previous = select._searchState || { text: "", time: 0 };
  const stale = now - previous.time > SELECT_SEARCH_TIMEOUT;
  const base = stale ? "" : previous.text;
  const next = event.key === "Backspace" ? base.slice(0, -1) : `${base}${event.key}`;
  select._searchState = { text: normalizeSelectSearch(next), time: now };
  applyCustomSelectSearch(select, select._searchState.text);
}

function applyCustomSelectSearch(select, query) {
  const menu = customSelectMenu(select);
  const options = Array.from(menu.querySelectorAll(".select-option"));
  const normalized = normalizeSelectSearch(query);
  let visible = 0;

  options.forEach((option) => {
    const matches = !normalized || option.dataset.search.includes(normalized);
    option.hidden = !matches;
    if (matches) visible += 1;
  });

  const empty = menu.querySelector(".select-empty");
  if (empty) empty.hidden = visible > 0;
  menu.classList.toggle("is-filtering", Boolean(normalized));

  const visibleOptions = visibleCustomOptions(select);
  const nextFocus = visibleOptions.find((option) => option.dataset.value === select.value) || visibleOptions[0];
  if (document.activeElement === select._customSearch || document.activeElement === select._mobileInput) {
    nextFocus?.scrollIntoView({ block: "nearest" });
  } else if (nextFocus) {
    nextFocus.focus({ preventScroll: true });
    nextFocus.scrollIntoView({ block: "nearest" });
  } else {
    menu.focus({ preventScroll: true });
  }
  positionCustomSelectMenu(select);
}

function resetCustomSelectSearch(select) {
  select._searchState = { text: "", time: 0 };
  const menu = customSelectMenu(select);
  if (!menu) return;
  if (select._customSearch) select._customSearch.value = "";
  menu.classList.remove("is-filtering");
  menu.querySelectorAll(".select-option").forEach((option) => {
    option.hidden = false;
  });
  const empty = menu.querySelector(".select-empty");
  if (empty) empty.hidden = true;
}

function visibleCustomOptions(select) {
  return Array.from(customSelectMenu(select).querySelectorAll(".select-option")).filter((option) => !option.hidden);
}

function isSearchableSelect(select) {
  return !["tripLength", "stopLength"].includes(select.id);
}

function isSelectSearchKey(event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return false;
  return event.key === "Backspace" || (event.key.length === 1 && /\S/.test(event.key));
}

function normalizeSelectSearch(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function customSelectMenu(select) {
  return select._customMenu;
}

function selectLabelText(select) {
  return select.closest("label")?.querySelector("span")?.textContent?.trim() || "Search";
}

function syncMobileSelectInput(select, selected, meta) {
  if (!select?._mobileInput || !selected) return;
  const cityItem = cities.find((item) => item.name === selected.value);
  const isTyping = document.activeElement === select._mobileInput && select.closest(".select-shell")?.classList.contains("is-open");
  if (!isTyping) select._mobileInput.value = selected.text;
  select._mobileInput.placeholder = selected.text || "Search city";
  select._mobileBadge.textContent = meta.badge || "";
  select._mobileFlag.innerHTML = cityItem ? flagBadgeHtml(cityItem) : "";
  select.closest(".select-shell")?.classList.toggle("has-mobile-flag", Boolean(cityItem));
}

function mobileSelectInputIsVisible(select) {
  return Boolean(select?._mobileInput) && window.matchMedia("(max-width: 760px)").matches;
}

function positionOpenCustomSelects() {
  document.querySelectorAll(".select-native").forEach((select) => {
    if (select.closest(".select-shell")?.classList.contains("is-open")) {
      positionCustomSelectMenu(select);
    }
  });
}

function positionCustomSelectMenu(select) {
  const shell = select.closest(".select-shell");
  const button = mobileSelectInputIsVisible(select) ? select._mobileInput : shell.querySelector(".select-button");
  const menu = customSelectMenu(select);
  if (!button || !menu || menu.hidden) return;

  const rect = button.getBoundingClientRect();
  const viewportPad = 12;
  const gap = 8;
  const compact = ["tripLength", "stopLength"].includes(select.id);
  const desiredWidth = compact ? Math.max(rect.width, 300) : Math.max(rect.width, 320);
  const width = Math.min(desiredWidth, window.innerWidth - viewportPad * 2);
  const below = window.innerHeight - rect.bottom - gap - viewportPad;
  const above = rect.top - gap - viewportPad;
  const openAbove = below < (compact ? 210 : 260) && above > below;
  const maxHeight = compact ? 280 : Math.max(180, Math.min(380, openAbove ? above : below));

  menu.style.width = `${width}px`;
  menu.style.maxHeight = compact ? "none" : `${maxHeight}px`;
  menu.style.left = `${Math.round(Math.min(window.innerWidth - width - viewportPad, Math.max(viewportPad, compact ? rect.right - width : rect.left)))}px`;
  menu.style.top = "-9999px";
  menu.classList.toggle("is-above", openAbove);

  const height = menu.offsetHeight;
  const top = openAbove ? Math.max(viewportPad, rect.top - gap - height) : Math.min(window.innerHeight - viewportPad - height, rect.bottom + gap);
  menu.style.top = `${Math.round(Math.max(viewportPad, top))}px`;
}
