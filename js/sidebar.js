/* ========= 侧边栏：24小时视图 + 待办列表 ========= */
LC.openSidebar=function(ds){
  var sidebar = document.getElementById('sidebarOverlay');
  var header = document.getElementById('sidebarHeader');
  var fixedPart = document.getElementById('sidebarFixedPart');
  var scrollPart = document.getElementById('sidebarScrollPart');

  var isReopen = LC.currentSidebarDate === ds;
  var prevScroll = isReopen ? scrollPart.scrollTop : 0;

  LC.currentSidebarDate = ds;
  var evs = LC.getEv(ds).sort(function(a,b){ return (a.isAllDay?0:1)-(b.isAllDay?0:1) || (a.startTime||'').localeCompare(b.startTime||''); });
  var parts = ds.split('-');
  var dateLabel = parts[0] + '/' + parts[1];
  var dayLabel = parseInt(parts[2]);
  
  // ===== 硬编码星期映射（未使用统一函数）=====
  var weekdaysMap = {
    'zh-CN': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'zh-TW': ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    'en': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'ja': ['日', '月', '火', '水', '木', '金', '土'],
    'ko': ['일', '월', '화', '수', '목', '금', '토'],
    'ar': ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    'es': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    'fr': ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    'de': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    'it': ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    'pt': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    'ru': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    'hi': ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    'th': ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
  };
  var wdList = weekdaysMap[LC.curLang] || weekdaysMap['zh-CN'];
  var targetDate = new Date(ds + 'T00:00:00');
  var weekdayName = wdList[targetDate.getDay()];
  // ========================================
  
  header.innerHTML = '<div class="sb-info" style="text-align:center;">'+dateLabel+'</div><div class="sb-date" style="text-align:center; display:flex; align-items:baseline; justify-content:center; gap:8px;">'+dayLabel+'<span style="font-size:0.9rem; font-weight:normal; color:#b0a090;">'+weekdayName+'</span></div>';

  var allDayEvs = evs.filter(function(e){return e.isAllDay});
  var fixedHtml = '<div class="all-day-slot"><h4>'+LC.t('sbt','All Day')+'</h4>';
  if(allDayEvs.length){
    allDayEvs.forEach(function(e){
      var c = LC.EC[e.type]||LC.EC.o;
      // 转义标题
      var safeTitle = LC.escapeHtml(e.title);
      fixedHtml += '<div class="all-day-event" data-id="'+e.id+'" style="background:'+c+'44; border-left:3px solid '+c+'">'+safeTitle+'</div>';
    });
  } else {
    fixedHtml += '<div style="font-size:.78rem;color:#b0a090;text-align:center;padding:4px 0" onclick="openModal(\''+ds+'\')">+'+LC.t('et','New Event')+'</div>';
  }
  fixedHtml += '</div>';
  fixedPart.innerHTML = fixedHtml;

  // 全天日程左键点击弹出信息弹窗，右键弹出编辑/删除菜单
  var allDayEvEls = fixedPart.querySelectorAll('.all-day-event');
  allDayEvEls.forEach(function(el){
    el.addEventListener('click', function(e){
      e.stopPropagation();
      var evId = el.dataset.id;
      var ev = LC.ud.events.find(function(ev){ return ev.id === evId; });
      if(ev) LC.showInfoPopover(e.clientX, e.clientY, ev, LC.currentSidebarDate);
    });
    el.addEventListener('contextmenu', function(e){
      e.preventDefault();
      e.stopPropagation();
      var evId = el.dataset.id;
      LC.showCtxMenu(e.clientX, e.clientY, evId, LC.currentSidebarDate);
    });
  });

  var timeEvs = evs.filter(function(e){ return !e.isAllDay; });
  var gridHtml = '<div class="time-grid">';

  for(var h=0;h<24;h++){
    var hStr = String(h).padStart(2,'0');
    var label = LC.tf('sbh',{h:hStr}, hStr+':00');
    gridHtml += '<div class="time-hour-row" data-hour="'+h+'">';
    gridHtml += '<div class="time-hour-label">'+label+'</div>';
    gridHtml += '<div class="time-hour-line"></div>';
    gridHtml += '</div>';
  }

  timeEvs.forEach(function(ev){
    var sParts = (ev.startTime||'09:00').split(':');
    var eParts = (ev.endTime||'10:00').split(':');
    ev.startMin = LC.clamp(parseInt(sParts[0])*60 + parseInt(sParts[1]), 0, 1440);
    ev.endMin = LC.clamp(parseInt(eParts[0])*60 + parseInt(eParts[1]), 0, 1440);
    if(ev.endMin <= ev.startMin) ev.endMin = ev.startMin + 15;
  });

  var layouts = LC.layoutEvents(timeEvs);
  layouts.forEach(function(layout){
    var ev = layout.ev;
    var c = LC.EC[ev.type]||LC.EC.o;
    var top = ev.startMin;
    var height = ev.endMin - ev.startMin;
    var widthPercent = 100 / layout.totalCols;
    var leftPercent = layout.col * widthPercent;

    // 转义标题和时间
    var safeTitle = LC.escapeHtml(ev.title);
    var safeStartTime = LC.escapeHtml(ev.startTime || '');
    
    gridHtml += '<div class="time-event-block" data-id="'+ev.id+'" data-startdate="'+ev.startDate+'" style="top:'+top+'px; height:'+height+'px; left:calc(65px + (100% - 75px) * '+leftPercent/100+'); width:calc((100% - 75px) * '+widthPercent/100+' - 4px); background:'+c+'33; border-color:'+c+';">';
    gridHtml += '<div class="resize-handle top"></div>';
    gridHtml += '<div class="ev-title">'+safeTitle+'</div>';
    gridHtml += '<div class="ev-time">'+safeStartTime+'</div>';
    gridHtml += '<div class="resize-handle bottom"></div>';
    gridHtml += '</div>';
  });

  gridHtml += '</div>';
  scrollPart.innerHTML = gridHtml;

  sidebar.classList.add('active');

  if (!isReopen) {
    var now = new Date();
    if(ds === LC.todayStr()) {
      scrollPart.scrollTop = now.getHours() * 60 - 60;
    } else if(timeEvs.length) {
      scrollPart.scrollTop = Math.max(0, timeEvs[0].startMin - 30);
    }
  } else {
    scrollPart.scrollTop = prevScroll;
  }

  var evBlocks = scrollPart.querySelectorAll('.time-event-block');
  evBlocks.forEach(function(block){
    LC.bindDragEvent(block, ds);
  });

  // 点击时间区域弹出新建日程
  var hourRows = scrollPart.querySelectorAll('.time-hour-row');
  hourRows.forEach(function(row) {
    row.removeEventListener('click', LC.handleHourRowClick);
    row.addEventListener('click', LC.handleHourRowClick);
  });
  LC.currentSidebarDateForHourClick = ds;
  
  // 更新待办标题多语言
  var todoTitle = document.getElementById('todoTitle');
  if (todoTitle) {
    todoTitle.innerHTML = '📋 ' + LC.t('todo_title', '待办日程');
  }
  
  // 渲染待办列表
  LC.renderTodoList(ds);
  
  // 恢复分割比例
  LC.restoreSplitRatio();
};

// 处理时间行点击的函数
LC.handleHourRowClick = function(e) {
  e.stopPropagation();
  var ds = LC.currentSidebarDateForHourClick;
  var hour = parseInt(this.dataset.hour);
  if (!isNaN(hour)) {
    LC.openModal(ds, hour);
  } else {
    LC.openModal(ds, 9);
  }
};

LC.layoutEvents=function(events) {
  if(!events.length) return [];
  events.sort(function(a,b){ return a.startMin - b.startMin; });
  var columns = [];
  var evLayouts = [];

  events.forEach(function(ev){
    var placed = false;
    for(var i=0; i<columns.length; i++) {
      var lastInCol = columns[i][columns[i].length - 1];
      if(ev.startMin >= lastInCol.endMin) {
        columns[i].push(ev);
        ev._col = i;
        placed = true;
        break;
      }
    }
    if(!placed) {
      columns.push([ev]);
      ev._col = columns.length - 1;
    }
  });

  var groups = [];
  if(events.length) {
    var currentGroup = [events[0]];
    for(var i=1; i<events.length; i++) {
      var overlapsGroup = currentGroup.some(function(e){ return events[i].startMin < e.endMin; });
      if(overlapsGroup) {
        currentGroup.push(events[i]);
      } else {
        groups.push(currentGroup);
        currentGroup = [events[i]];
      }
    }
    groups.push(currentGroup);
  }

  groups.forEach(function(group){
    var maxCol = 0;
    group.forEach(function(ev){ if(ev._col > maxCol) maxCol = ev._col; });
    var totalCols = maxCol + 1;
    group.forEach(function(ev){
      evLayouts.push({
        ev: ev,
        col: ev._col,
        totalCols: totalCols
      });
    });
  });

  return evLayouts;
};

/* ========= 待办列表渲染 ========= */
LC.renderTodoList = function(ds) {
  var todoList = document.getElementById('todoList');
  if (!todoList) return;
  
  var evs = LC.getEv(ds);
  if (!evs.length) {
    todoList.innerHTML = '<div class="todo-empty">📭 ' + LC.t('todo_empty', '暂无待办日程') + '</div>';
    return;
  }
  
  var todoItems = evs.map(function(ev) {
    var completed = LC.getTodoCompleted(ev.id, ds);
    return {
      id: ev.id,
      title: ev.title,
      type: ev.type,
      completed: completed,
      startTime: ev.startTime || '23:59',
      isAllDay: ev.isAllDay
    };
  });
  
  todoItems.sort(function(a, b) {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (!a.completed) {
      var timeA = a.isAllDay ? '00:00' : (a.startTime || '23:59');
      var timeB = b.isAllDay ? '00:00' : (b.startTime || '23:59');
      return timeA.localeCompare(timeB);
    }
    return a.title.localeCompare(b.title);
  });
  
  var html = '';
  todoItems.forEach(function(item) {
    var c = LC.EC[item.type] || LC.EC.o;
    var completedClass = item.completed ? 'completed' : '';
    var checkedAttr = item.completed ? 'checked' : '';
    var safeTitle = LC.escapeHtml(item.title);
    
    html += `
      <div class="todo-item ${completedClass}" data-id="${item.id}" data-date="${ds}">
        <input type="checkbox" class="todo-checkbox" ${checkedAttr}>
        <div class="todo-type-dot" style="background: ${c};"></div>
        <div class="todo-content">
          <span class="todo-title">${safeTitle}</span>
        </div>
      </div>
    `;
  });
  
  todoList.innerHTML = html;
  
  var checkboxes = todoList.querySelectorAll('.todo-checkbox');
  checkboxes.forEach(function(cb) {
    cb.addEventListener('change', function(e) {
      e.stopPropagation();
      var todoItem = this.closest('.todo-item');
      var eventId = todoItem.dataset.id;
      var date = todoItem.dataset.date;
      var completed = this.checked;
      LC.setTodoCompleted(eventId, date, completed);
      LC.renderTodoList(date);
    });
  });
  
  var todoItemsDivs = todoList.querySelectorAll('.todo-item');
  todoItemsDivs.forEach(function(item) {
    item.addEventListener('click', function(e) {
      if (e.target.classList.contains('todo-checkbox')) return;
      e.stopPropagation();
      var eventId = this.dataset.id;
      var date = this.dataset.date;
      LC.openModal(date, null, eventId);
    });
    item.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var eventId = this.dataset.id;
      var date = this.dataset.date;
      document.getElementById('infoPopover').style.display = 'none';
      LC.showCtxMenu(e.clientX, e.clientY, eventId, date);
    });
  });
};

LC.escapeHtml = function(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
};

/* ========= 分割条拖拽逻辑（优化 localStorage 写入） ========= */
LC.initSplitBar = function() {
  var splitBar = document.getElementById('splitBar');
  var timelineContainer = document.getElementById('timelineContainer');
  var todoContainer = document.getElementById('todoContainer');
  var resizableContainer = document.getElementById('resizableContainer');
  
  if (!splitBar || !timelineContainer || !todoContainer) return;
  
  var isDragging = false;
  var startY = 0;
  var startTimelineHeight = 0;
  var containerHeight = 0;
  var pendingPercent = null;
  
  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    startY = e.clientY !== undefined ? e.clientY : (e.touches ? e.touches[0].clientY : 0);
    containerHeight = resizableContainer.offsetHeight;
    startTimelineHeight = timelineContainer.offsetHeight;
    pendingPercent = null;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
  }
  
  function onDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    var currentY = e.clientY !== undefined ? e.clientY : (e.touches ? e.touches[0].clientY : 0);
    var deltaY = currentY - startY;
    var newTimelineHeight = startTimelineHeight + deltaY;
    var minTimelineHeight = 100;
    var minTodoHeight = 100;
    var maxTimelineHeight = containerHeight - minTodoHeight;
    newTimelineHeight = Math.max(minTimelineHeight, Math.min(maxTimelineHeight, newTimelineHeight));
    var timelinePercent = (newTimelineHeight / containerHeight) * 100;
    timelineContainer.style.flex = '0 0 ' + timelinePercent + '%';
    todoContainer.style.flex = '0 0 ' + (100 - timelinePercent) + '%';
    pendingPercent = timelinePercent;
  }
  
  function onDragEnd() {
    if (isDragging) {
      if (pendingPercent !== null) {
        localStorage.setItem(LC.SPLIT_RATIO_KEY, pendingPercent);
      }
      isDragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onDragMove);
      document.removeEventListener('mouseup', onDragEnd);
      document.removeEventListener('touchmove', onDragMove);
      document.removeEventListener('touchend', onDragEnd);
    }
  }
  
  splitBar.addEventListener('mousedown', startDrag);
  splitBar.addEventListener('touchstart', startDrag, { passive: false });
};

LC.restoreSplitRatio = function() {
  var timelineContainer = document.getElementById('timelineContainer');
  var todoContainer = document.getElementById('todoContainer');
  var resizableContainer = document.getElementById('resizableContainer');
  if (!timelineContainer || !todoContainer || !resizableContainer) return;
  var savedRatio = localStorage.getItem(LC.SPLIT_RATIO_KEY);
  if (savedRatio !== null) {
    var timelinePercent = parseFloat(savedRatio);
    timelineContainer.style.flex = '0 0 ' + timelinePercent + '%';
    todoContainer.style.flex = '0 0 ' + (100 - timelinePercent) + '%';
  } else {
    timelineContainer.style.flex = '0 0 60%';
    todoContainer.style.flex = '0 0 40%';
  }
};

/* ========= 拖拽事件 ========= */
LC.bindDragEvent=function(block, ds) {
  block.addEventListener('mousedown', function(e) {
    if(e.button === 2) return;
    e.preventDefault();
    e.stopPropagation();
    var isTopHandle = e.target.classList.contains('top');
    var isBottomHandle = e.target.classList.contains('bottom');
    LC.dragState = {
      type: isTopHandle ? 'resize-top' : (isBottomHandle ? 'resize-bottom' : 'move'),
      evId: block.dataset.id,
      startY: e.clientY,
      startX: e.clientX,
      origTop: parseInt(block.style.top),
      origHeight: parseInt(block.style.height),
      block: block,
      ds: ds,
      moved: false
    };
    document.addEventListener('mousemove', LC.handleDragMove);
    document.addEventListener('mouseup', LC.handleDragEnd);
  });
  block.addEventListener('contextmenu', function(e){
    e.preventDefault();
    e.stopPropagation();
    var evId = block.dataset.id;
    document.getElementById('infoPopover').style.display = 'none';
    LC.showCtxMenu(e.clientX, e.clientY, evId, ds);
  });
};

LC.handleDragMove=function(e) {
  if(!LC.dragState) return;
  var deltaY = e.clientY - LC.dragState.startY;
  var deltaX = Math.abs(e.clientX - LC.dragState.startX);
  if(Math.abs(deltaY) > 2 || deltaX > 2) LC.dragState.moved = true;
  if(LC.dragState.type === 'move') {
    var newTop = LC.dragState.origTop + deltaY;
    LC.dragState.block.style.top = newTop + 'px';
    LC.dragState.block.style.cursor = 'grabbing';
  } else if(LC.dragState.type === 'resize-top') {
    var newTop = LC.dragState.origTop + deltaY;
    var newHeight = LC.dragState.origHeight - deltaY;
    if(newHeight < 15) return;
    LC.dragState.block.style.top = newTop + 'px';
    LC.dragState.block.style.height = newHeight + 'px';
  } else if(LC.dragState.type === 'resize-bottom') {
    var newHeight = LC.dragState.origHeight + deltaY;
    if(newHeight < 15) return;
    LC.dragState.block.style.height = newHeight + 'px';
  }
};

LC.handleDragEnd=function(e) {
  if(!LC.dragState) return;
  var ev = LC.ud.events.find(function(ev){ return ev.id === LC.dragState.evId; });
  if(!LC.dragState.moved) {
    var ctxMenu = document.getElementById('ctxMenu');
    if(ev && !ev.isAllDay && ctxMenu.style.display !== 'block') {
      LC.showInfoPopover(e.clientX, e.clientY, ev, LC.dragState.ds);
    }
    LC.dragState = null;
    document.removeEventListener('mousemove', LC.handleDragMove);
    document.removeEventListener('mouseup', LC.handleDragEnd);
    return;
  }
  if(ev) {
    var deltaY = e.clientY - LC.dragState.startY;
    var deltaMin = Math.round(deltaY);
    if(LC.dragState.type === 'move') {
      var duration = LC.dragState.origHeight;
      ev.startMin = LC.clamp(LC.dragState.origTop + deltaMin, 0, 1440 - duration);
      ev.endMin = ev.startMin + duration;
    } else if(LC.dragState.type === 'resize-top') {
      ev.startMin = LC.clamp(LC.dragState.origTop + deltaMin, 0, LC.dragState.origTop + LC.dragState.origHeight - 15);
      ev.endMin = LC.dragState.origTop + LC.dragState.origHeight;
    } else if(LC.dragState.type === 'resize-bottom') {
      ev.endMin = LC.clamp(LC.dragState.origTop + LC.dragState.origHeight + deltaMin, ev.startMin + 15, 1440);
    }
    ev.startTime = String(Math.floor(ev.startMin / 60)).padStart(2,'0') + ':' + String(ev.startMin % 60).padStart(2,'0');
    ev.endTime = String(Math.floor(ev.endMin / 60)).padStart(2,'0') + ':' + String(ev.endMin % 60).padStart(2,'0');
    LC.save();
    var scrollPart = document.getElementById('sidebarScrollPart');
    var prevScroll = scrollPart.scrollTop;
    LC.openSidebar(LC.dragState.ds);
    scrollPart.scrollTop = prevScroll;
  }
  LC.dragState = null;
  document.removeEventListener('mousemove', LC.handleDragMove);
  document.removeEventListener('mouseup', LC.handleDragEnd);
};

/* ========= 右键菜单 ========= */
LC.showCtxMenu=function(x, y, id, ds){
  var pop = document.getElementById('infoPopover');
  if(pop) pop.style.display = 'none';
  var ctxMenu = document.getElementById('ctxMenu');
  ctxMenu.style.left = x+'px';
  ctxMenu.style.top = y+'px';
  ctxMenu.style.display = 'block';
  LC.ctxEventId = {id: id, ds: ds};
  var editBtn = document.getElementById('ctxEdit');
  var delBtn = document.getElementById('ctxDel');
  var newEditBtn = editBtn.cloneNode(true);
  var newDelBtn = delBtn.cloneNode(true);
  editBtn.parentNode.replaceChild(newEditBtn, editBtn);
  delBtn.parentNode.replaceChild(newDelBtn, delBtn);
  newEditBtn.onclick = function(){
    ctxMenu.style.display='none';
    if(LC.ctxEventId) LC.openModal(LC.ctxEventId.ds, null, LC.ctxEventId.id);
  };
  newDelBtn.onclick = function(){
    ctxMenu.style.display='none';
    if(LC.ctxEventId) LC.showConfirmDel(LC.ctxEventId.id, LC.ctxEventId.ds);
  };
};

/* ========= 确认删除 - 彻底修复按钮重复问题 ========= */
LC.showConfirmDel = function(id, ds) {
  var ev = LC.ud.events.find(function(e) { return e.id === id; });
  if (!ev) return;

  var isRecurring = ev.repeat && ev.repeat !== 'none';
  var confirmOverlay = document.getElementById('confirmOverlay');
  
  // 确保 confirmOverlay 内有正确的结构，且每次打开前完全重置内容
  confirmOverlay.innerHTML = `
    <div class="confirm-box">
      <p id="confirmMsg"></p>
      <div class="btn-row" id="confirmBtnRow"></div>
    </div>
  `;
  
  var msgEl = document.getElementById('confirmMsg');
  var btnRow = document.getElementById('confirmBtnRow');
  
  if (isRecurring) {
    msgEl.textContent = LC.t('confirm_del_recurring', '确定删除此重复日程吗？');
    
    var confirmSingle = document.createElement('button');
    confirmSingle.className = 'hand-btn danger-btn';
    confirmSingle.textContent = LC.t('del_single', '仅删除此日程');
    confirmSingle.style.borderColor = '#c06060';
    confirmSingle.style.color = '#c06060';
    
    var confirmAll = document.createElement('button');
    confirmAll.className = 'hand-btn primary';
    confirmAll.textContent = LC.t('del_all', '删除所有日程');
    
    var confirmCancel = document.createElement('button');
    confirmCancel.className = 'hand-btn';
    confirmCancel.textContent = LC.t('no', '取消');
    
    btnRow.appendChild(confirmSingle);
    btnRow.appendChild(confirmAll);
    btnRow.appendChild(confirmCancel);
    
    confirmAll.onclick = function() {
      LC.clearTodoCompletedByEventId(id);
      LC.ud.events = LC.ud.events.filter(function(e) { return e.id !== id; });
      LC.save();
      confirmOverlay.classList.remove('active');
      var scrollPart = document.getElementById('sidebarScrollPart');
      var prevScroll = scrollPart ? scrollPart.scrollTop : 0;
      LC.openSidebar(ds);
      if (scrollPart) scrollPart.scrollTop = prevScroll;
    };
    
    confirmSingle.onclick = function() {
      LC.deleteSingleRecurrence(id, ds);
      confirmOverlay.classList.remove('active');
      var scrollPart = document.getElementById('sidebarScrollPart');
      var prevScroll = scrollPart ? scrollPart.scrollTop : 0;
      LC.openSidebar(ds);
      if (scrollPart) scrollPart.scrollTop = prevScroll;
    };
    
    confirmCancel.onclick = function() {
      confirmOverlay.classList.remove('active');
    };
  } else {
    msgEl.textContent = LC.t('confirm_del', '删除后无法恢复，确认删除该日程吗？');
    
    var confirmYes = document.createElement('button');
    confirmYes.className = 'hand-btn primary';
    confirmYes.textContent = LC.t('yes', '确认');
    
    var confirmNo = document.createElement('button');
    confirmNo.className = 'hand-btn';
    confirmNo.textContent = LC.t('no', '取消');
    
    btnRow.appendChild(confirmYes);
    btnRow.appendChild(confirmNo);
    
    confirmYes.onclick = function() {
      LC.clearTodoCompletedByEventId(id);
      LC.ud.events = LC.ud.events.filter(function(e) { return e.id !== id; });
      LC.save();
      confirmOverlay.classList.remove('active');
      var scrollPart = document.getElementById('sidebarScrollPart');
      var prevScroll = scrollPart ? scrollPart.scrollTop : 0;
      LC.openSidebar(ds);
      if (scrollPart) scrollPart.scrollTop = prevScroll;
    };
    
    confirmNo.onclick = function() {
      confirmOverlay.classList.remove('active');
    };
  }
  
  confirmOverlay.classList.add('active');
};

LC.deleteSingleRecurrence = function(id, targetDate) {
  var ev = LC.ud.events.find(function(e) { return e.id === id; });
  if (!ev) return;
  if (!ev.exceptions) ev.exceptions = [];
  if (ev.exceptions.indexOf(targetDate) === -1) {
    ev.exceptions.push(targetDate);
  }
  LC.save();
};

/* ========= 侧边栏关闭与宽度调整 ========= */
document.getElementById('sidebarClose').onclick = function() {
  document.getElementById('sidebarOverlay').classList.remove('active');
  LC.currentSidebarDate = null;
};

document.getElementById('sidebarDragHandle').addEventListener('mousedown', function(e) {
  LC.isResizingSidebar = true;
  LC.sidebarStartX = e.clientX;
  LC.sidebarStartW = document.getElementById('sidebarOverlay').offsetWidth;
  e.preventDefault();
});
addEventListener('mousemove', function(e) {
  if (!LC.isResizingSidebar) return;
  var newW = LC.sidebarStartW - (e.clientX - LC.sidebarStartX);
  newW = Math.max(280, Math.min(800, newW));
  document.getElementById('sidebarOverlay').style.width = newW + 'px';
});
addEventListener('mouseup', function() { LC.isResizingSidebar = false; });

setTimeout(function() {
  LC.initSplitBar();
}, 100);
