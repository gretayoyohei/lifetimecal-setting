/* ========= 获取星期名称（支持多语言） ========= */
LC.getWeekdayName = function(dateStr, lang) {
  var weekdays = {
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
  var wd = weekdays[lang] || weekdays['zh-CN'];
  var d = new Date(dateStr + 'T00:00:00');
  return wd[d.getDay()];
};

/* ========= 事件信息浮窗 - 优化版 ========= */
LC.findEventAt = function(sx, sy) {
  for(var i = LC.dayEventRects.length - 1; i >= 0; i--) {
    var r = LC.dayEventRects[i];
    if(sx >= r.x && sx <= r.x + r.w && sy >= r.y && sy <= r.y + r.h) {
      return r;
    }
  }
  return null;
};

LC.showInfoPopover = function(clientX, clientY, ev, ds) {
  var pop = document.getElementById('infoPopover');
  var c = LC.EC[ev.type] || LC.EC.o;
  var tp2 = LC.t('tp', {});
  
  // 类型徽章（放在底部）
  var typeHtml = '<span style="width:10px;height:10px;border-radius:50%;background:' + c + ';display:inline-block;margin-right:6px"></span>' + (tp2[ev.type] || ev.type);
  document.getElementById('infoPType').innerHTML = typeHtml;
  
  // 标题（顶部）
  document.getElementById('infoPTitle').textContent = ev.title;
  
  // 时间信息（带星期）
  var timeStr = '';
  if (ev.isAllDay) {
    timeStr = '📅 ' + LC.t('allday', 'All Day') + ' · ' + ev.startDate + ' (' + LC.getWeekdayName(ev.startDate, LC.curLang) + ')';
  } else {
    timeStr = '⏰ ' + ev.startTime + ' - ' + ev.endTime + ' · ' + ev.startDate + ' (' + LC.getWeekdayName(ev.startDate, LC.curLang) + ')';
  }
  document.getElementById('infoPTime').textContent = timeStr;
  
  // 地点信息（带图标）
  var locEl = document.getElementById('infoPLoc');
  if (ev.location && ev.location.trim() !== '') {
    locEl.innerHTML = '📍 ' + ev.location;
    locEl.style.display = 'flex';
  } else {
    locEl.style.display = 'none';
  }
  
  // 描述信息（带图标）- 使用 💬
  var descEl = document.getElementById('infoPDesc');
  if (ev.description && ev.description.trim() !== '') {
    descEl.innerHTML = '💬 ' + ev.description;
    descEl.style.display = 'block';
  } else {
    descEl.style.display = 'none';
  }
  
  // 编辑按钮
  document.getElementById('infoEditBtn').innerHTML = '📝';
  document.getElementById('infoEditBtn').onclick = function(e) {
    e.stopPropagation();
    pop.style.display = 'none';
    LC.openModal(ds, null, ev.id);
  };
  
  // 删除按钮
  document.getElementById('infoDelBtn').innerHTML = '🗑';
  document.getElementById('infoDelBtn').onclick = function(e) {
    e.stopPropagation();
    pop.style.display = 'none';
    LC.showConfirmDel(ev.id, ds);
  };
  
  // 关闭按钮
  document.getElementById('infoCloseBtn').innerHTML = '✕';
  document.getElementById('infoCloseBtn').onclick = function(e) {
    e.stopPropagation();
    pop.style.display = 'none';
  };
  
  // 显示弹窗并定位
  pop.style.display = 'block';
  var left = clientX + 15;
  var top = clientY + 15;
  var popRect = pop.getBoundingClientRect();
  if (left + popRect.width > window.innerWidth) {
    left = clientX - popRect.width - 15;
  }
  if (top + popRect.height > window.innerHeight) {
    top = clientY - popRect.height - 15;
  }
  if (left < 5) left = 5;
  if (top < 5) top = 5;
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
};

document.addEventListener('mousedown', function(e) {
  var pop = document.getElementById('infoPopover');
  if(pop.style.display === 'block' && !pop.contains(e.target)) {
    pop.style.display = 'none';
  }
});

/* ========= 输入处理 ========= */
LC.cvs.addEventListener('wheel',function(e){e.preventDefault();if(!LC.ud)return;document.getElementById('zoomHint').classList.add('hidden');var rect=LC.cvs.getBoundingClientRect();var mx=e.clientX-rect.left,my=e.clientY-rect.top;LC.anchWX=(mx-LC.W/2)/LC.zoom+LC.cx;LC.anchWY=(my-LC.H/2)/LC.zoom+LC.cy;LC.anchSX=mx;LC.anchSY=my;LC.hasAnch=true;LC.tZoom=LC.clamp(LC.tZoom*(e.deltaY>0?.88:1.14),0.12,30)},{passive:false});
LC.cvs.addEventListener('mousedown',function(e){if(e.button===0){var mo=document.getElementById('modalOverlay'),co=document.getElementById('confirmOverlay');if((mo&&mo.classList.contains('active'))||(co&&co.classList.contains('active')))return;LC.dragging=true;LC.movedDist=0;LC.dragX0=e.clientX;LC.dragY0=e.clientY;LC.cx0=LC.cx;LC.cy0=LC.cy;LC.cvs.classList.add('grabbing')}});
addEventListener('mousemove',function(e){if(!LC.dragging)return;var dx=e.clientX-LC.dragX0,dy=e.clientY-LC.dragY0;LC.movedDist+=Math.abs(dx)+Math.abs(dy);LC.cx=LC.cx0-dx/LC.zoom;LC.cy=LC.cy0-dy/LC.zoom;LC.targetCx=LC.cx;LC.targetCy=LC.cy;LC.hasAnch=false;LC.dragX0=e.clientX;LC.dragY0=e.clientY;LC.cx0=LC.cx;LC.cy0=LC.cy});
addEventListener('mouseup',function(e){
  if(LC.dragging&&LC.movedDist<6&&e.button===0) LC.handleClick(e.clientX,e.clientY);
  LC.dragging=false;LC.cvs.classList.remove('grabbing');
});
LC.cvs.addEventListener('touchstart',function(e){e.preventDefault();if(e.touches.length===1){LC.dragging=true;LC.movedDist=0;LC.dragX0=e.touches[0].clientX;LC.dragY0=e.touches[0].clientY;LC.cx0=LC.cx;LC.cy0=LC.cy}else if(e.touches.length===2){LC.dragging=false;var dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;LC.t0Dist=Math.sqrt(dx*dx+dy*dy);LC.t0Zoom=LC.tZoom;var mx2=(e.touches[0].clientX+e.touches[1].clientX)/2,my2=(e.touches[0].clientY+e.touches[1].clientY)/2;LC.anchWX=(mx2-LC.W/2)/LC.zoom+LC.cx;LC.anchWY=(my2-LC.H/2)/LC.zoom+LC.cy;LC.anchSX=mx2;LC.anchSY=my2;LC.hasAnch=true}},{passive:false});
LC.cvs.addEventListener('touchmove',function(e){e.preventDefault();if(e.touches.length===1&&LC.dragging){var dx=e.touches[0].clientX-LC.dragX0,dy=e.touches[0].clientY-LC.dragY0;LC.movedDist+=Math.abs(dx)+Math.abs(dy);LC.cx=LC.cx0-dx/LC.zoom;LC.cy=LC.cy0-dy/LC.zoom;LC.targetCx=LC.cx;LC.targetCy=LC.cy;LC.hasAnch=false;LC.dragX0=e.touches[0].clientX;LC.dragY0=e.touches[0].clientY;LC.cx0=LC.cx;LC.cy0=LC.cy}else if(e.touches.length===2){var dx2=e.touches[0].clientX-e.touches[1].clientX,dy2=e.touches[0].clientY-e.touches[1].clientY;var d=Math.sqrt(dx2*dx2+dy2*dy2);LC.tZoom=LC.clamp(LC.t0Zoom*(d/LC.t0Dist),0.12,30)}},{passive:false});
LC.cvs.addEventListener('touchend',function(e){if(LC.dragging&&LC.movedDist<10&&e.changedTouches.length){var tc=e.changedTouches[0];LC.handleClick(tc.clientX,tc.clientY)}LC.dragging=false});

/* ========= 键盘快捷键 ========= */
addEventListener('keydown',function(e){
  if(!LC.ud)return;
  if(e.key==='='||e.key==='+')LC.tZoom=LC.clamp(LC.tZoom*1.2,0.12,30);
  if(e.key==='-')LC.tZoom=LC.clamp(LC.tZoom*.83,0.12,30);
});

/* ========= 右键菜单 ========= */
LC.cvs.addEventListener('contextmenu', function(e){
  e.preventDefault();
  e.stopPropagation();
  if(!LC.ud) return;
  var rect=LC.cvs.getBoundingClientRect();
  var sx=e.clientX-rect.left, sy=e.clientY-rect.top;

  document.getElementById('infoPopover').style.display = 'none';

  var evHit = LC.findEventAt(sx, sy);
  if(evHit) {
    LC.showCtxMenu(e.clientX, e.clientY, evHit.ev.id, evHit.ds);
    return;
  }
  var ctxMenu = document.getElementById('ctxMenu');
  if(ctxMenu.style.display==='block') ctxMenu.style.display='none';
});

LC.hideCtxMenu = function(e) {
  var ctxMenu = document.getElementById('ctxMenu');
  if(ctxMenu.style.display==='block' && !ctxMenu.contains(e.target)){
    ctxMenu.style.display='none';
  }
};
document.addEventListener('mousedown', LC.hideCtxMenu);
document.addEventListener('contextmenu', LC.hideCtxMenu);

/* ========= 点击检测 ========= */
LC.handleClick=function(sx,sy){
  if(!LC.ud)return;
  LC.dragging=false;LC.cvs.classList.remove('grabbing');

  var rect=LC.cvs.getBoundingClientRect();
  var csx=sx-rect.left, csy=sy-rect.top;
  var evHit = LC.findEventAt(csx, csy);
  if(evHit) {
    LC.showInfoPopover(sx, sy, evHit.ev, evHit.ds);
    return;
  }

  document.getElementById('infoPopover').style.display = 'none';

  var w=LC.s2w(csx,csy),hit=LC.hitTest(w.x,w.y);
  if(hit&&hit.type==='day') {
    LC.openSidebar(hit.date);
    LC.openModal(hit.date);
  } else {
    var sidebar = document.getElementById('sidebarOverlay');
    if(sidebar.classList.contains('active')){
      sidebar.classList.remove('active');
      LC.currentSidebarDate = null;
    }
  }
};
LC.hitTest=function(wx,wy){
  var col=Math.floor(wx/(LC.YW+LC.YGAP)),row=Math.floor(wy/(LC.YH+LC.YGAP));
  if(col<0||col>=LC.YPR||row<0)return null;
  var i=row*LC.YPR+col;if(i>=LC.totalYrs)return null;
  var year=LC.birthYr+i,lx=wx-col*(LC.YW+LC.YGAP),ly=wy-row*(LC.YH+LC.YGAP);
  if(lx<0||lx>=LC.YW||ly<0||ly>=LC.YH)return null;
  var mc=Math.floor((lx-LC.MPAD)/(LC.MW+LC.MPAD)),mr=Math.floor((ly-LC.MPAD)/(LC.MH+LC.MPAD));
  if(mc<0||mc>=4||mr<0||mr>=3)return{type:'year',year:year};
  var mlx=lx-LC.MPAD-mc*(LC.MW+LC.MPAD),mly=ly-LC.MPAD-mr*(LC.MH+LC.MPAD);
  if(mlx<0||mlx>=LC.MW||mly<0||mly>=LC.MH)return{type:'year',year:year};
  var m=mr*4+mc;if(m>=12)return{type:'year',year:year};
  if(LC.zoom<LC.ZD_SHOW*.8)return{type:'month',year:year,month:m};
  var mi=LC.monthInfo(year,m),dc=Math.floor((mlx-LC.DPAD)/(LC.DW+LC.DGAP)),dr=Math.floor((mly-LC.HDR-LC.DPAD)/(LC.DH+LC.DGAP));
  if(dc<0||dc>=7||dr<0||dr>=6)return{type:'month',year:year,month:m};
  // 检查是否在日期格子内部（排除格子间隙和月份标题区域）
  var cellX=(mlx-LC.DPAD)-dc*(LC.DW+LC.DGAP),cellY=(mly-LC.HDR-LC.DPAD)-dr*(LC.DH+LC.DGAP);
  if(cellX<0||cellX>=LC.DW||cellY<0||cellY>=LC.DH)return{type:'month',year:year,month:m};
  var dayIdx=dr*7+dc-mi.dow1+1;
  if(dayIdx<1||dayIdx>mi.days)return{type:'month',year:year,month:m};
  return{type:'day',year:year,month:m,day:dayIdx,date:LC.fmtDate(year,m,dayIdx)}
};