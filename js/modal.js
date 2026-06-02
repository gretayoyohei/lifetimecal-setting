/* ========= 事件弹窗 ========= */
LC.openModal=function(ds, hourOrAll, editId){
  var isNew = !editId;
  var editEvent = null;
  var defaultStart = ds + 'T09:00';
  var defaultEnd = ds + 'T10:00';
  var defaultType = 'p';
  var defaultAllDay = false;
  var defaultRepeat = 'none';
  var defaultRemind = 'none';
  var defaultLoc = '';
  var defaultDesc = '';
  var defaultTitle = '';
  var defaultStartTime = '09:00';
  var defaultEndTime = '10:00';

  if(!LC.ud) LC.ud = { events: [] };
  if(!LC.ud.events) LC.ud.events = [];

  if(isNew && typeof hourOrAll !== 'undefined'){
    if(hourOrAll === 'all'){
      defaultAllDay = true;
    } else {
      var h = String(hourOrAll).padStart(2,'0');
      defaultStartTime = h + ':00';
      defaultEndTime = h + ':59';
    }
  }
  if(editId){
    editEvent = LC.ud.events.find(function(e){ return e.id === editId; });
    if(editEvent){
      defaultTitle = editEvent.title;
      defaultType = editEvent.type || 'p';
      defaultAllDay = editEvent.isAllDay;
      defaultStart = editEvent.startDate;
      defaultEnd = editEvent.endDate || editEvent.startDate;
      defaultStartTime = editEvent.startTime || '09:00';
      defaultEndTime = editEvent.endTime || '10:00';
      defaultRepeat = editEvent.repeat || 'none';
      defaultRemind = editEvent.remindBefore || 'none';
      defaultLoc = editEvent.location || '';
      defaultDesc = editEvent.description || '';
    }
  }
  var tp2 = LC.t('tp',{});
  var typeKeys = ['p','h','w','s','b','i','a','o'];
  var typeColors = LC.EC;
  var typeTagsHtml = '<div class="type-tags">';
  typeKeys.forEach(function(k){
    var lbl = tp2[k]||k;
    var c = typeColors[k]||'#ccc';
    var active = (k===defaultType) ? ' active' : '';
    typeTagsHtml += '<div class="type-tag'+active+'" data-type="'+k+'" style="background:'+c+'44" onclick="selectType(this,\''+k+'\')"><span class="type-dot" style="background:'+c+'"></span>'+lbl+'</div>';
  });
  typeTagsHtml += '</div>';
  var repeatOpts = [
    {v:'none', l:'rp_n'}, {v:'daily', l:'rp_d'}, {v:'weekly', l:'rp_w'}, {v:'monthly', l:'rp_m'}, {v:'yearly', l:'rp_y'}
  ];
  var repeatHtml = '<select id="evRepeat">';
  repeatOpts.forEach(function(o){ repeatHtml += '<option value="'+o.v+'"'+(o.v===defaultRepeat?' selected':'')+'>'+LC.t(o.l,o.v)+'</option>'; });
  repeatHtml += '</select>';
  
  // 提醒选项
  var remindOptions = [
    { val: 'none', label: LC.t('remind_none', '无提醒') },
    { val: 'on_time', label: LC.t('remind_on_time', '准时') },
    { val: '5m', label: LC.t('remind_5m', '5分钟前') },
    { val: '15m', label: LC.t('remind_15m', '15分钟前') },
    { val: '30m', label: LC.t('remind_30m', '30分钟前') },
    { val: '1h', label: LC.t('remind_1h', '1小时前') },
    { val: '2h', label: LC.t('remind_2h', '2小时前') },
    { val: '1d', label: LC.t('remind_1d', '1天前') },
    { val: '2d', label: LC.t('remind_2d', '2天前') },
    { val: '3d', label: LC.t('remind_3d', '3天前') },
    { val: '1w', label: LC.t('remind_1w', '1周前') }
  ];
  var remindHtml = '<select id="evRemindBefore">';
  remindOptions.forEach(function(o) {
    remindHtml += '<option value="'+o.val+'"'+(o.val===defaultRemind?' selected':'')+'>'+o.label+'</option>';
  });
  remindHtml += '</select>';
  
  // 转义特殊字符，防止XSS和HTML注入
  var safeTitle = defaultTitle.replace(/[&<>]/g, function(m) {
    if(m === '&') return '&amp;';
    if(m === '<') return '&lt;';
    if(m === '>') return '&gt;';
    return m;
  });
  var safeLoc = defaultLoc.replace(/[&<>]/g, function(m) {
    if(m === '&') return '&amp;';
    if(m === '<') return '&lt;';
    if(m === '>') return '&gt;';
    return m;
  });
  var safeDesc = defaultDesc.replace(/[&<>]/g, function(m) {
    if(m === '&') return '&amp;';
    if(m === '<') return '&lt;';
    if(m === '>') return '&gt;';
    return m;
  });
  
  document.getElementById('modalBox').innerHTML =
    '<button class="modal-close" id="mClose">✕</button>'+
    '<h3 style="font-family:\'Playpen Sans\',\'Zen Maru Gothic\',\'Noto Sans SC\',\'PingFang SC\',\'Microsoft YaHei\',sans-serif;margin-bottom:8px;color:#4a3728;font-size:1.3rem;text-align:center">'+LC.t('et','New Event')+'</h3>'+
    '<input id="evTitle" placeholder="'+LC.t('ph_smart','Try...')+'" value="'+safeTitle+'">'+
    typeTagsHtml +
    '<div class="form-row all-day-row"><label>'+LC.t('allday','All Day')+'</label><label class="toggle-switch"><input type="checkbox" id="evAllDay" '+(defaultAllDay?'checked':'')+' onchange="toggleAllDay()"><span class="toggle-slider"></span></label></div>'+
    '<div class="form-row"><label>'+LC.t('start','Start')+'</label><input type="date" class="date-input" id="evStartDate" value="'+(editEvent?defaultStart:ds)+'"><input type="time" class="time-input" id="evStartTime" value="'+defaultStartTime+'"></div>'+
    '<div class="form-row"><label>'+LC.t('end','End')+'</label><input type="date" class="date-input" id="evEndDate" value="'+(editEvent?defaultEnd:ds)+'"><input type="time" class="time-input" id="evEndTime" value="'+defaultEndTime+'"></div>'+
    '<div class="form-row"><label>'+LC.t('repeat','Repeat')+'</label>'+repeatHtml+'</div>'+
    '<div class="form-row"><label>'+LC.t('remind','提醒')+'</label>'+remindHtml+'</div>'+
    '<div class="form-row form-row-textarea"><label>'+LC.t('location','Loc')+'</label><textarea id="evLoc" rows="2" placeholder="'+LC.t('location','Loc')+'" class="modal-textarea">'+safeLoc+'</textarea></div>'+
    '<div class="form-row form-row-textarea"><label>'+LC.t('notes','Notes')+'</label><textarea id="evDesc" rows="3" placeholder="'+LC.t('notes','Notes')+'" class="modal-textarea">'+safeDesc+'</textarea></div>'+
    '<div class="btn-row"><button class="hand-btn primary" id="btnSaveEv">'+LC.t('sv','Save')+'</button>'+(editId?'<button class="hand-btn danger-btn" id="btnDelEv" style="border-color:#c06060;color:#c06060">'+LC.t('dl','Del')+'</button>':'')+'<button class="hand-btn" id="btnCancelEv">'+LC.t('cn','Cancel')+'</button></div>';
  
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('mClose').onclick=LC.closeModal;
  document.getElementById('btnCancelEv').onclick=LC.closeModal;
  
  var chk = document.getElementById('evAllDay');
  var timeInputs = document.querySelectorAll('.time-input');
  if(chk){
    timeInputs.forEach(function(r){ r.style.display = chk.checked ? 'none' : 'block'; });
  }

  if(editId){
    document.getElementById('btnDelEv').onclick = function(){
      LC.closeModal();
      if(LC.showConfirmDel){
        LC.showConfirmDel(editId, ds);
      }
    };
  }
  
  // 修复保存按钮事件监听
  var saveBtn = document.getElementById('btnSaveEv');
  // 移除可能存在的旧监听，避免重复绑定
  var newSaveBtn = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
  
  newSaveBtn.onclick = function(){
    try {
      var title = document.getElementById('evTitle').value.trim();
      if(!title){ 
        document.getElementById('evTitle').style.borderColor='#e88'; 
        alert(LC.t('fa','请填写标题'));
        return; 
      }

      var activeType = document.querySelector('.type-tag.active');
      var type = activeType ? activeType.dataset.type : 'p';
      var isAllDay = document.getElementById('evAllDay').checked;
      var startDate = document.getElementById('evStartDate').value;
      var endDate = document.getElementById('evEndDate').value || startDate;
      var startTime = isAllDay ? '00:00' : document.getElementById('evStartTime').value;
      var endTime = isAllDay ? '23:59' : document.getElementById('evEndTime').value;
      var repeat = document.getElementById('evRepeat').value;
      var remindBefore = document.getElementById('evRemindBefore').value;
      var loc = document.getElementById('evLoc').value;
      var desc = document.getElementById('evDesc').value;

      if(editEvent){
        // 编辑已有事件
        editEvent.title = title;
        editEvent.type = type;
        editEvent.isAllDay = isAllDay;
        editEvent.startDate = startDate;
        editEvent.endDate = endDate;
        editEvent.startTime = startTime;
        editEvent.endTime = endTime;
        editEvent.repeat = repeat;
        editEvent.remindBefore = remindBefore;
        editEvent.location = loc;
        editEvent.description = desc;
      } else {
        // 新建事件，生成唯一ID
        var newId = LC.genId();
        LC.ud.events.push({
          id: newId,
          title: title,
          type: type,
          isAllDay: isAllDay,
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          endTime: endTime,
          repeat: repeat,
          remindBefore: remindBefore,
          location: loc,
          description: desc,
          exceptions: []   // 初始化例外列表
        });
      }

      // 保存到localStorage
      localStorage.setItem(LC.STORE, JSON.stringify(LC.ud));
      // 标记索引为脏，下次渲染会重建
      if(LC.markIndexDirty) LC.markIndexDirty();
      
      LC.closeModal();
      
      // 刷新侧边栏（如果侧边栏打开的是同一天）
      if(LC.openSidebar && LC.currentSidebarDate === ds){
        var scrollPart = document.getElementById('sidebarScrollPart');
        var prevScroll = scrollPart ? scrollPart.scrollTop : 0;
        LC.openSidebar(ds);
        if(scrollPart){
          scrollPart.scrollTop = prevScroll;
        }
      } else if(LC.render){
        // 否则重新渲染日历
        LC.render();
      }
    } catch(e) {
      console.error('保存失败：', e);
      alert('保存失败：' + e.message);
      LC.closeModal();
    }
  };
};

window.openModal = LC.openModal;

window.selectType = function(el, type){
  var tags = document.querySelectorAll('.type-tag');
  tags.forEach(function(t){t.classList.remove('active')});
  el.classList.add('active');
};

window.toggleAllDay = function(){
  var chk = document.getElementById('evAllDay');
  var timeInputs = document.querySelectorAll('.time-input');
  if(!chk) return;
  timeInputs.forEach(function(r){ r.style.display = chk.checked ? 'none' : 'block'; });
};

LC.closeModal=function(){ document.getElementById('modalOverlay').classList.remove('active'); };
document.getElementById('modalOverlay').onclick=function(e){if(e.target===this)LC.closeModal()};
