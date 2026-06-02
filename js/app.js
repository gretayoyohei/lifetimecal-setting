/* ========= 年龄验证 ========= */
LC.validateAge=function(){
  var hint=document.getElementById('ageHint');
  try{
    var y=document.getElementById('inBirthY').value, m=document.getElementById('inBirthM').value, d=document.getElementById('inBirthD').value;
    var life=parseInt(document.getElementById('inLife').value);
    if(!y||!m||!d||isNaN(life)){hint.textContent='';return}
    var birth=y+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    var age=LC.calcAge(birth);
    if(life>120)hint.textContent=LC.t('am','Max 120');
    else if(life<=age)hint.textContent=LC.tf('al',{a:age},'Min age '+(age+1));
    else hint.textContent='';
  }catch(e){hint.textContent=''}
};
document.getElementById('inLife').addEventListener('input',LC.validateAge);
document.getElementById('inBirthY').addEventListener('change',LC.validateAge);
document.getElementById('inBirthM').addEventListener('change',LC.validateAge);
document.getElementById('inBirthD').addEventListener('change',LC.validateAge);

/* ========= 动画循环 ========= */
LC.animate=function(){
  var prev=LC.zoom;
  LC.zoom+=(LC.tZoom-LC.zoom)*.13;
  if(LC.targetCx!==undefined) LC.cx+=(LC.targetCx-LC.cx)*.1;
  if(LC.targetCy!==undefined) LC.cy+=(LC.targetCy-LC.cy)*.1;
  if(LC.hasAnch&&Math.abs(LC.zoom-prev)>0.0001){
    LC.cx=LC.anchWX-(LC.anchSX-LC.W/2)/LC.zoom;
    LC.cy=LC.anchWY-(LC.anchSY-LC.H/2)/LC.zoom;
    LC.targetCx=LC.cx; LC.targetCy=LC.cy;
  }
  LC.render();
  requestAnimationFrame(LC.animate);
};

/* ========= 视图控制 ========= */
LC.resetView=function(){LC.tZoom=Math.min(LC.W/(LC.gridW+80),LC.H/(LC.gridH+80))*.9;LC.targetCx=LC.gridW/2;LC.targetCy=LC.gridH/2;LC.hasAnch=false};
LC.zoomToToday=function(){
  var now=new Date(),yi=now.getFullYear()-LC.birthYr;if(yi<0||yi>=LC.totalYrs)return;
  var wp=LC.yrPos(yi),mi=now.getMonth(),mp=LC.moPos(mi);
  var info=LC.monthInfo(now.getFullYear(),mi),day=now.getDate();
  var dow=(info.dow1+day-1)%7,wr=Math.floor((info.dow1+day-1)/7);
  var dp2=LC.dayPos(dow,wr);
  LC.targetCx=wp.x+mp.x+dp2.x+LC.DW/2;LC.targetCy=wp.y+mp.y+dp2.y+LC.DH/2;LC.tZoom=22;LC.hasAnch=false;
};
LC.zoomToThisYear=function(){
  var now = new Date(), yi = now.getFullYear() - LC.birthYr;
  if(yi<0||yi>=LC.totalYrs) return;
  var wp = LC.yrPos(yi);
  LC.targetCx = wp.x + LC.YW/2;
  LC.targetCy = wp.y + LC.YH/2;
  LC.tZoom = Math.min(LC.W/(LC.YW+40), LC.H/(LC.YH+40));
  LC.hasAnch = false;
};
LC.zoomToThisMonth=function(){
  var now = new Date(), yi = now.getFullYear() - LC.birthYr, mi = now.getMonth();
  if(yi<0||yi>=LC.totalYrs) return;
  var wp = LC.yrPos(yi), mp = LC.moPos(mi);
  LC.targetCx = wp.x + mp.x + LC.MW/2;
  LC.targetCy = wp.y + mp.y + LC.MH/2;
  LC.tZoom = Math.min(LC.W/(LC.MW+20), LC.H/(LC.MH+20));
  LC.hasAnch = false;
};

/* ========= 移动端控制栏文字优化 ========= */
LC.optimizeMobileButtonText = function() {
  if (window.innerWidth <= 768) {
    var btnThisYearEl = document.getElementById('btnThisYear');
    var btnThisMonthEl = document.getElementById('btnThisMonth');
    var btnResetEl = document.getElementById('btnReset');
    var btnTodayEl = document.getElementById('btnToday');
    
    if (LC.curLang === 'en') {
      if (btnThisYearEl && btnThisYearEl.textContent === 'This Year') btnThisYearEl.textContent = 'Year';
      if (btnThisMonthEl && btnThisMonthEl.textContent === 'This Month') btnThisMonthEl.textContent = 'Month';
      if (btnResetEl && btnResetEl.textContent === 'Overview') btnResetEl.textContent = 'All';
    } else if (LC.curLang === 'es') {
      if (btnThisYearEl && btnThisYearEl.textContent === 'Este Año') btnThisYearEl.textContent = 'Año';
      if (btnThisMonthEl && btnThisMonthEl.textContent === 'Este Mes') btnThisMonthEl.textContent = 'Mes';
      if (btnResetEl && btnResetEl.textContent === 'Vista general') btnResetEl.textContent = 'Todo';
    } else if (LC.curLang === 'fr') {
      if (btnThisYearEl && btnThisYearEl.textContent === 'Cette Année') btnThisYearEl.textContent = 'Année';
      if (btnThisMonthEl && btnThisMonthEl.textContent === 'Ce Mois') btnThisMonthEl.textContent = 'Mois';
      if (btnResetEl && btnResetEl.textContent === "Vue d'ensemble") btnResetEl.textContent = 'Tout';
    } else if (LC.curLang === 'de') {
      if (btnThisYearEl && btnThisYearEl.textContent === 'Dieses Jahr') btnThisYearEl.textContent = 'Jahr';
      if (btnThisMonthEl && btnThisMonthEl.textContent === 'Dieser Monat') btnThisMonthEl.textContent = 'Monat';
      if (btnResetEl && btnResetEl.textContent === 'Gesamtübersicht') btnResetEl.textContent = 'Alle';
    } else if (LC.curLang === 'it') {
      if (btnThisYearEl && btnThisYearEl.textContent === 'Quest\'Anno') btnThisYearEl.textContent = 'Anno';
      if (btnThisMonthEl && btnThisMonthEl.textContent === 'Questo Mese') btnThisMonthEl.textContent = 'Mese';
      if (btnResetEl && btnResetEl.textContent === 'Panoramica') btnResetEl.textContent = 'Tutto';
    } else if (LC.curLang === 'pt') {
      if (btnThisYearEl && btnThisYearEl.textContent === 'Este Ano') btnThisYearEl.textContent = 'Ano';
      if (btnThisMonthEl && btnThisMonthEl.textContent === 'Este Mês') btnThisMonthEl.textContent = 'Mês';
      if (btnResetEl && btnResetEl.textContent === 'Visão geral') btnResetEl.textContent = 'Tudo';
    } else if (LC.curLang === 'ru') {
      if (btnThisYearEl && btnThisYearEl.textContent === 'Этот Год') btnThisYearEl.textContent = 'Год';
      if (btnThisMonthEl && btnThisMonthEl.textContent === 'Этот Месяц') btnThisMonthEl.textContent = 'Месяц';
      if (btnResetEl && btnResetEl.textContent === 'Общий вид') btnResetEl.textContent = 'Все';
    } else if (LC.curLang === 'ja') {
      if (btnThisYearEl && btnThisYearEl.textContent === '今年') btnThisYearEl.textContent = '年';
      if (btnThisMonthEl && btnThisMonthEl.textContent === '今月') btnThisMonthEl.textContent = '月';
      if (btnResetEl && btnResetEl.textContent === '全体表示') btnResetEl.textContent = '全体';
    } else if (LC.curLang === 'ko') {
      if (btnThisYearEl && btnThisYearEl.textContent === '올해') btnThisYearEl.textContent = '년';
      if (btnThisMonthEl && btnThisMonthEl.textContent === '이번 달') btnThisMonthEl.textContent = '월';
      if (btnResetEl && btnResetEl.textContent === '전체보기') btnResetEl.textContent = '전체';
    } else if (LC.curLang === 'zh-CN' || LC.curLang === 'zh-TW') {
      if (btnThisYearEl && btnThisYearEl.textContent === '今年') btnThisYearEl.textContent = '年';
      if (btnThisMonthEl && btnThisMonthEl.textContent === '本月') btnThisMonthEl.textContent = '月';
      if (btnResetEl && btnResetEl.textContent === '全局') btnResetEl.textContent = '全部';
    }
  }
};

/* ========= 手机端将工具箱移动到控制栏内 ========= */
LC.moveToolboxToControls = function() {
  if (window.innerWidth > 768) return;
  
  var existingBtn = document.getElementById('mobileToolboxBtn');
  var existingMenu = document.getElementById('mobileToolboxMenu');
  if (existingBtn) existingBtn.remove();
  if (existingMenu) existingMenu.remove();
  
  var toolboxContainer = document.getElementById('toolboxContainer');
  var controls = document.getElementById('controls');
  var btnToday = document.getElementById('btnToday');
  
  if (!toolboxContainer || !controls || !btnToday) return;
  
  toolboxContainer.style.display = 'none';
  toolboxContainer.classList.add('moved-to-controls');
  
  var newToolboxBtn = document.createElement('button');
  newToolboxBtn.id = 'mobileToolboxBtn';
  newToolboxBtn.className = 'ctrl-btn toolbox-ctrl-btn';
  newToolboxBtn.innerHTML = '🛠️';
  newToolboxBtn.title = LC.t('toolbox_title', '工具箱');
  
  var newMenu = document.createElement('div');
  newMenu.id = 'mobileToolboxMenu';
  newMenu.className = 'toolbox-menu';
  
  var exportItem = document.createElement('div');
  exportItem.className = 'toolbox-item';
  exportItem.setAttribute('data-action', 'export');
  exportItem.innerHTML = '<span class="toolbox-icon">📤</span><span class="toolbox-label">' + LC.t('toolbox_export', '导出日程') + '</span>';
  
  var importItem = document.createElement('div');
  importItem.className = 'toolbox-item';
  importItem.setAttribute('data-action', 'import');
  importItem.innerHTML = '<span class="toolbox-icon">📥</span><span class="toolbox-label">' + LC.t('toolbox_import', '导入日程') + '</span>';
  
  var logoutItem = document.createElement('div');
  logoutItem.className = 'toolbox-item toolbox-item-danger';
  logoutItem.setAttribute('data-action', 'logout');
  logoutItem.innerHTML = '<span class="toolbox-icon">🚪</span><span class="toolbox-label">' + LC.t('toolbox_logout', '登出') + '</span>';
  
  newMenu.appendChild(exportItem);
  newMenu.appendChild(importItem);
  newMenu.appendChild(logoutItem);
  document.body.appendChild(newMenu);
  
  newToolboxBtn.onclick = function(e) {
    e.stopPropagation();
    if (newMenu.classList.contains('active')) {
      newMenu.classList.remove('active');
    } else {
      var allMenus = document.querySelectorAll('.toolbox-menu');
      allMenus.forEach(function(m) { m.classList.remove('active'); });
      newMenu.classList.add('active');
      var rect = newToolboxBtn.getBoundingClientRect();
      newMenu.style.position = 'fixed';
      newMenu.style.bottom = (window.innerHeight - rect.top + 5) + 'px';
      newMenu.style.left = (rect.left + rect.width/2 - 80) + 'px';
    }
  };
  
  function closeMenuOnOutsideClick(e) {
    if (!newMenu.classList.contains('active')) return;
    if (newMenu.contains(e.target) || newToolboxBtn.contains(e.target)) return;
    newMenu.classList.remove('active');
  }
  document.addEventListener('click', closeMenuOnOutsideClick);
  document.addEventListener('touchstart', closeMenuOnOutsideClick);
  
  controls.insertBefore(newToolboxBtn, btnToday.nextSibling);
};

/* ========= 登出函数 ========= */
LC.logoutToInput = function() {
  var controls = document.getElementById('controls');
  if (controls) controls.classList.remove('active');
  var inputPage = document.getElementById('inputPage');
  if (inputPage) inputPage.classList.remove('hidden');
  LC.showBgAnim = true;
  LC.drawStaticBg();
  var sidebar = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('active');
  LC.currentSidebarDate = null;
  if (LC.ud) {
    document.getElementById('inName').value = LC.ud.name || '';
    var birthParts = LC.ud.birthDate.split('-');
    if (birthParts.length === 3) {
      document.getElementById('inBirthY').value = parseInt(birthParts[0]);
      document.getElementById('inBirthM').value = parseInt(birthParts[1]);
      document.getElementById('inBirthD').value = parseInt(birthParts[2]);
      LC.populateBirthSelects();
      document.getElementById('inBirthY').value = parseInt(birthParts[0]);
      document.getElementById('inBirthM').value = parseInt(birthParts[1]);
      document.getElementById('inBirthD').value = parseInt(birthParts[2]);
    }
    document.getElementById('inLife').value = LC.ud.lifeExp;
    LC.validateAge();
  } else {
    document.getElementById('inName').value = '';
    document.getElementById('inBirthY').value = '';
    document.getElementById('inBirthM').value = '';
    document.getElementById('inBirthD').value = '';
    document.getElementById('inLife').value = 80;
    LC.populateBirthSelects();
    LC.validateAge();
  }
  if (LC.ctx) {
    LC.ctx.clearRect(0, 0, LC.W, LC.H);
  }
};

/* ========= 手机端语言切换按钮 ========= */
LC.initMobileLangPicker = function() {
  if (window.innerWidth > 768) return;
  if (document.getElementById('mobileLangBtn')) return;
  
  var btn = document.createElement('div');
  btn.id = 'mobileLangBtn';
  btn.className = 'mobile-lang-btn';
  btn.innerHTML = '🌐';
  btn.title = 'Language';
  
  var menu = document.createElement('div');
  menu.id = 'mobileLangMenu';
  menu.className = 'mobile-lang-menu';
  
  for (var i = 0; i < LC.langOrder.length; i++) {
    var code = LC.langOrder[i];
    if (!LC.D[code]) continue;
    var item = document.createElement('div');
    item.className = 'mobile-lang-item';
    item.textContent = LC.D[code].nm;
    item.setAttribute('data-lang', code);
    item.onclick = (function(c) {
      return function() {
        LC.curLang = c;
        localStorage.setItem(LC.LANG_KEY, LC.curLang);
        document.body.classList.toggle('rtl', LC.curLang === 'ar');
        LC.refreshText();
        LC.populateBirthSelects();
        menu.classList.remove('active');
        LC.refreshMobileLangMenu();
      };
    })(code);
    menu.appendChild(item);
  }
  for (var k in LC.D) {
    if (LC.langOrder.indexOf(k) === -1) {
      var item = document.createElement('div');
      item.className = 'mobile-lang-item';
      item.textContent = LC.D[k].nm;
      item.setAttribute('data-lang', k);
      item.onclick = (function(c) {
        return function() {
          LC.curLang = c;
          localStorage.setItem(LC.LANG_KEY, LC.curLang);
          document.body.classList.toggle('rtl', LC.curLang === 'ar');
          LC.refreshText();
          LC.populateBirthSelects();
          menu.classList.remove('active');
          LC.refreshMobileLangMenu();
        };
      })(k);
      menu.appendChild(item);
    }
  }
  
  document.body.appendChild(btn);
  document.body.appendChild(menu);
  
  btn.onclick = function(e) {
    e.stopPropagation();
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
    } else {
      LC.refreshMobileLangMenu();
      menu.classList.add('active');
    }
  };
  
  document.addEventListener('click', function(e) {
    if (menu.classList.contains('active') && !btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
};

LC.refreshMobileLangMenu = function() {
  var menu = document.getElementById('mobileLangMenu');
  if (!menu) return;
  var items = menu.querySelectorAll('.mobile-lang-item');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var code = item.getAttribute('data-lang');
    if (code && LC.D[code]) {
      item.textContent = LC.D[code].nm;
    }
  }
};

/* ========= 启动按钮 ========= */
document.getElementById('btnGo').onclick=function(){
  var name=document.getElementById('inName').value.trim();
  var y=document.getElementById('inBirthY').value, m=document.getElementById('inBirthM').value, d=document.getElementById('inBirthD').value;
  var life=parseInt(document.getElementById('inLife').value);
  var hint=document.getElementById('ageHint');
  if(!name||!y||!m||!d||isNaN(life)){hint.textContent=LC.t('fa','Please fill all fields');return}
  var birth=y+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
  if(life>120){hint.textContent=LC.t('am','Max 120');return}
  var age=LC.calcAge(birth);
  if(life<=age){hint.textContent=LC.tf('al',{a:age},'Age must be > '+age);return}
  var bd=new Date(birth+'T00:00:00');if(bd>new Date()){hint.textContent=LC.t('bf','Invalid date');return}
  
  var oldLifeExp = LC.ud ? LC.ud.lifeExp : null;
  var oldBirthDate = LC.ud ? LC.ud.birthDate : null;
  
  if(oldLifeExp !== null && oldBirthDate === birth && life < oldLifeExp) {
    var birthYear = new Date(birth+'T00:00:00').getFullYear();
    var oldEndYear = birthYear + oldLifeExp - 1;
    var newEndYear = birthYear + life - 1;
    if(newEndYear < oldEndYear) {
      var firstHiddenYear = newEndYear + 1;
      var confirmOverlay = document.getElementById('confirmOverlay');
      var confirmMsg = document.getElementById('confirmMsg');
      var btnRow = document.getElementById('confirmYes').parentNode;
      var originalYesClass = document.getElementById('confirmYes').className;
      var originalNoClass = document.getElementById('confirmNo').className;
      btnRow.innerHTML = '';
      btnRow.style.display = 'flex';
      btnRow.style.flexDirection = 'row';
      btnRow.style.gap = '12px';
      btnRow.style.justifyContent = 'center';
      var confirmYesBtn = document.createElement('button');
      confirmYesBtn.id = 'confirmYes';
      confirmYesBtn.className = originalYesClass;
      confirmYesBtn.textContent = LC.t('yes', '确定');
      var confirmNoBtn = document.createElement('button');
      confirmNoBtn.id = 'confirmNo';
      confirmNoBtn.className = originalNoClass;
      confirmNoBtn.textContent = LC.t('no', '取消');
      btnRow.appendChild(confirmYesBtn);
      btnRow.appendChild(confirmNoBtn);
      confirmMsg.textContent = LC.tf('lifeWarnShort', {
        old: oldLifeExp,
        new: life,
        year: firstHiddenYear
      });
      confirmOverlay.classList.add('active');
      confirmYesBtn.onclick = function() {
        confirmOverlay.classList.remove('active');
        if(typeof LC.restoreConfirmButtons === 'function') {
          LC.restoreConfirmButtons(btnRow);
        }
        var oldEv = (LC.ud && LC.ud.birthDate===birth) ? (LC.ud.events||[]) : [];
        LC.ud={name:name,birthDate:birth,lifeExp:life,events:oldEv};
        LC.originalLifeExp = life;
        LC.save();
        LC.enterCalendar();
      };
      confirmNoBtn.onclick = function() {
        confirmOverlay.classList.remove('active');
        if(typeof LC.restoreConfirmButtons === 'function') {
          LC.restoreConfirmButtons(btnRow);
        }
        document.getElementById('inLife').value = oldLifeExp;
        LC.validateAge();
      };
      return;
    }
  }
  
  var oldEv = (LC.ud && LC.ud.birthDate===birth) ? (LC.ud.events||[]) : [];
  LC.ud={name:name,birthDate:birth,lifeExp:life,events:oldEv};
  LC.originalLifeExp = life;
  LC.save();
  LC.enterCalendar();
};

document.getElementById('btnReset').onclick=function(){LC.resetView(); document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate=null;};
document.getElementById('btnThisYear').onclick=function(){LC.zoomToThisYear(); document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate=null;};
document.getElementById('btnThisMonth').onclick=function(){LC.zoomToThisMonth(); document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate=null;};
document.getElementById('btnToday').onclick=function(){LC.zoomToToday(); document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate=null;};

/* ========= 进入日历 ========= */
LC.enterCalendar=function(){
  LC.birthYr=new Date(LC.ud.birthDate+'T00:00:00').getFullYear();
  LC.totalYrs=LC.ud.lifeExp;
  LC.gridW=LC.YPR*(LC.YW+LC.YGAP)-LC.YGAP;LC.gridH=Math.ceil(LC.totalYrs/LC.YPR)*(LC.YH+LC.YGAP)-LC.YGAP;
  document.getElementById('inputPage').classList.add('hidden');LC.showBgAnim=false;
  document.getElementById('controls').classList.add('active');
  var zoomHint = document.getElementById('zoomHint');
  zoomHint.classList.remove('hidden');
  if (window.innerWidth <= 768) {
    zoomHint.innerHTML = '<span class="gesture-arrow">⇅</span><span class="gesture-icon">🤏</span>';
    zoomHint.classList.add('gesture-hint');
  } else {
    zoomHint.textContent = LC.t('zh','Scroll to zoom');
    zoomHint.classList.remove('gesture-hint');
  }
  setTimeout(function(){ zoomHint.classList.add('hidden'); }, 4500);
  LC.zoom=Math.min(LC.W/(LC.gridW+80),LC.H/(LC.gridH+80))*.85;LC.tZoom=LC.zoom;
  LC.cx=LC.gridW/2;LC.cy=LC.gridH/2;LC.targetCx=LC.cx;LC.targetCy=LC.cy;
  
  // 请求通知权限（仅一次）
  if (!LC.notificationPermissionGranted) {
    LC.requestNotificationPermission();
  }
  // 启动提醒定时器
  if (!LC.remindIntervals) {
    LC.startReminderTimer();
  }
  // 建立事件日期索引（性能优化）
  LC.buildEventIndex();
};

/* ========= 初始化 ========= */
function init(){
  LC.buildLangSel();
  document.body.classList.toggle('rtl',LC.curLang==='ar');
  LC.populateBirthSelects();
  LC.animBg();
  if(LC.load()){
    if(LC.ud.events && LC.ud.events.length){
      LC.ud.events.forEach(function(e){
        if(!e.id) e.id = LC.genId();
        if(!e.startDate && e.date) {
          e.startDate = e.date;
          e.endDate = e.date;
          delete e.date;
        }
        if(!e.type) e.type = 'p';
        if(e.isAllDay === undefined) e.isAllDay = false;
        if(!e.repeat) e.repeat = 'none';
        if(e.remindBefore === undefined) e.remindBefore = 'none';
        if(!e.startTime && e.start) {
          var parts = e.start.split('T');
          e.startTime = parts[1] ? parts[1].substring(0,5) : '09:00';
        } else if(!e.startTime) {
          e.startTime = '09:00';
        }
        if(!e.endTime && e.end) {
          var parts = e.end.split('T');
          e.endTime = parts[1] ? parts[1].substring(0,5) : '10:00';
        } else if(!e.endTime) {
          e.endTime = '10:00';
        }
        delete e.start; delete e.end; delete e.time;
      });
      LC.save();
    }
    if(LC.ud && LC.ud.lifeExp) {
      LC.originalLifeExp = LC.ud.lifeExp;
    }
    LC.enterCalendar();
  }else{
    document.getElementById('inputPage').classList.remove('hidden');
  }
  LC.refreshText();
  LC.optimizeMobileButtonText();
  LC.moveToolboxToControls();
  LC.initMobileLangPicker();
  LC.animate();
}
init();

/* ========= 响应窗口大小变化 ========= */
window.addEventListener('resize', function() {
  LC.optimizeMobileButtonText();
  
  if (window.innerWidth > 768) {
    var mobileLangBtn = document.getElementById('mobileLangBtn');
    var mobileLangMenu = document.getElementById('mobileLangMenu');
    var mobileToolboxBtn = document.getElementById('mobileToolboxBtn');
    var mobileToolboxMenu = document.getElementById('mobileToolboxMenu');
    
    if (mobileLangBtn) mobileLangBtn.remove();
    if (mobileLangMenu) mobileLangMenu.remove();
    if (mobileToolboxBtn) mobileToolboxBtn.remove();
    if (mobileToolboxMenu) mobileToolboxMenu.remove();
    
    var toolboxContainer = document.getElementById('toolboxContainer');
    if (toolboxContainer) {
      toolboxContainer.style.display = 'flex';
      toolboxContainer.classList.remove('moved-to-controls');
    }
  } else {
    var oldLangBtn = document.getElementById('mobileLangBtn');
    var oldLangMenu = document.getElementById('mobileLangMenu');
    var oldToolboxBtn = document.getElementById('mobileToolboxBtn');
    var oldToolboxMenu = document.getElementById('mobileToolboxMenu');
    if (oldLangBtn) oldLangBtn.remove();
    if (oldLangMenu) oldLangMenu.remove();
    if (oldToolboxBtn) oldToolboxBtn.remove();
    if (oldToolboxMenu) oldToolboxMenu.remove();
    
    LC.moveToolboxToControls();
    LC.initMobileLangPicker();
  }
  
  var inputPage = document.getElementById('inputPage');
  if (inputPage && !inputPage.classList.contains('hidden') && LC.showBgAnim) {
    LC.drawStaticBg();
  }
});

/* ========= 全局监听手机端工具箱菜单点击 ========= */
document.addEventListener('click', function(e) {
  if (window.innerWidth > 768) return;
  var target = e.target.closest('.toolbox-item');
  if (!target) return;
  var menu = document.getElementById('mobileToolboxMenu');
  if (menu) menu.classList.remove('active');
  var action = target.getAttribute('data-action');
  if (action === 'export') {
    if(!LC.ud) return;
    var dataStr = JSON.stringify(LC.ud, null, 2);
    var blob = new Blob([dataStr], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = LC.getExportFileName();
    a.click();
    URL.revokeObjectURL(url);
  }
  else if (action === 'import') {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = function(e) {
      var file = e.target.files[0];
      if(!file) return;
      var reader = new FileReader();
      reader.onload = function(evt) {
        try {
          var imported = JSON.parse(evt.target.result);
          if(imported && imported.birthDate && imported.lifeExp !== undefined) {
            LC.ud = imported;
            if(!LC.ud.events) LC.ud.events = [];
            LC.save();
            LC.originalLifeExp = LC.ud.lifeExp;
            alert(LC.t('import_success', '导入成功！页面将刷新'));
            location.reload();
          } else {
            alert(LC.t('import_format_error', '文件格式不正确，请选择正确的人生日历备份文件'));
          }
        } catch(err) {
          alert(LC.t('import_parse_error', '解析失败：') + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
  else if (action === 'logout') {
    LC.logoutToInput();
  }
});

/* ========= 电脑端工具箱交互 ========= */
(function initToolbox() {
  var toolboxBtn = document.getElementById('toolboxBtn');
  var toolboxMenu = document.getElementById('toolboxMenu');
  var toolboxExport = document.getElementById('toolboxExport');
  var toolboxImport = document.getElementById('toolboxImport');
  var toolboxLogout = document.getElementById('toolboxLogout');
  
  function updateToolboxText() {
    if (toolboxBtn) toolboxBtn.title = LC.t('toolbox_title', '工具箱');
    if (toolboxExport) {
      var exportLabel = toolboxExport.querySelector('.toolbox-label');
      if (exportLabel) exportLabel.textContent = LC.t('toolbox_export', '导出日程');
    }
    if (toolboxImport) {
      var importLabel = toolboxImport.querySelector('.toolbox-label');
      if (importLabel) importLabel.textContent = LC.t('toolbox_import', '导入日程');
    }
    if (toolboxLogout) {
      var logoutLabel = toolboxLogout.querySelector('.toolbox-label');
      if (logoutLabel) logoutLabel.textContent = LC.t('toolbox_logout', '登出');
    }
  }
  
  function toggleMenu(e) {
    e.stopPropagation();
    toolboxMenu.classList.toggle('active');
  }
  
  function closeMenu() {
    toolboxMenu.classList.remove('active');
  }
  
  if (toolboxBtn) {
    toolboxBtn.addEventListener('click', toggleMenu);
  }
  
  document.addEventListener('click', function(e) {
    var container = document.getElementById('toolboxContainer');
    if (container && !container.contains(e.target)) {
      closeMenu();
    }
  });
  
  var exportTooltip = null;
  var exportTimeout = null;
  
  function getExportTooltipText() {
    return LC.t('tooltip_export', '🔒 为保护隐私，日程只存在您浏览器中。换设备或清缓存会丢失，建议定期导出日程备份。');
  }
  
  function showExportTooltip(target) {
    if (exportTooltip) {
      exportTooltip.remove();
      exportTooltip = null;
    }
    if (exportTimeout) clearTimeout(exportTimeout);
    exportTooltip = document.createElement('div');
    exportTooltip.className = 'tooltip';
    exportTooltip.textContent = getExportTooltipText();
    document.body.appendChild(exportTooltip);
    var rect = target.getBoundingClientRect();
    var left = rect.left;
    var top = rect.top - exportTooltip.offsetHeight - 8;
    if (top < 8) top = rect.bottom + 8;
    if (left + exportTooltip.offsetWidth > window.innerWidth - 8) {
      left = window.innerWidth - exportTooltip.offsetWidth - 8;
    }
    if (left < 8) left = 8;
    exportTooltip.style.left = left + 'px';
    exportTooltip.style.top = top + 'px';
    exportTooltip.classList.add('visible');
    exportTimeout = setTimeout(function() {
      if (exportTooltip) {
        exportTooltip.classList.remove('visible');
        setTimeout(function() {
          if (exportTooltip && exportTooltip.parentNode) exportTooltip.remove();
          exportTooltip = null;
        }, 200);
      }
    }, 4000);
  }
  
  function hideExportTooltip() {
    if (exportTimeout) clearTimeout(exportTimeout);
    if (exportTooltip) {
      exportTooltip.classList.remove('visible');
      setTimeout(function() {
        if (exportTooltip && exportTooltip.parentNode) exportTooltip.remove();
        exportTooltip = null;
      }, 200);
    }
  }
  
  if (toolboxExport) {
    toolboxExport.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
      if(!LC.ud) return;
      var dataStr = JSON.stringify(LC.ud, null, 2);
      var blob = new Blob([dataStr], {type: 'application/json'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = LC.getExportFileName();
      a.click();
      URL.revokeObjectURL(url);
    });
    toolboxExport.addEventListener('mouseenter', function(e) {
      showExportTooltip(e.target.closest('.toolbox-item'));
    });
    toolboxExport.addEventListener('mouseleave', hideExportTooltip);
  }
  
  var importConfirmOverlay = null;
  
  function createImportConfirmDialog() {
    var oldOverlay = document.getElementById('importConfirmOverlay');
    if (oldOverlay) oldOverlay.remove();
    var overlay = document.createElement('div');
    overlay.id = 'importConfirmOverlay';
    overlay.innerHTML = `
      <div class="import-confirm-box">
        <div class="warning-title">${LC.t('import_warning_title', '⚠️ 导入将覆盖现有日程')}</div>
        <p>${LC.t('import_warning_text', '导入的日程文档将完全替换您当前的所有日程数据，此操作不可撤销。')}</p>
        <p style="font-size:0.85rem; color:#8b7d6b;">${LC.t('import_suggestion', '建议在导入前先「导出日程」备份现有数据。')}</p>
        <div class="btn-row">
          <button class="hand-btn" id="importCancelBtn">${LC.t('import_cancel', '取消')}</button>
          <button class="hand-btn primary" id="importConfirmBtn">${LC.t('import_confirm', '确认导入')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }
  
  function refreshImportDialog() {
    if (importConfirmOverlay && importConfirmOverlay.classList.contains('active')) {
      var oldOverlay = importConfirmOverlay;
      var wasActive = oldOverlay.classList.contains('active');
      oldOverlay.remove();
      importConfirmOverlay = createImportConfirmDialog();
      if (wasActive) {
        importConfirmOverlay.classList.add('active');
        rebindImportButtons();
      }
    }
  }
  
  function rebindImportButtons() {
    var cancelBtn = document.getElementById('importCancelBtn');
    var confirmBtn = document.getElementById('importConfirmBtn');
    if (cancelBtn) {
      cancelBtn.onclick = function() {
        if (importConfirmOverlay) importConfirmOverlay.classList.remove('active');
      };
    }
    if (confirmBtn) {
      confirmBtn.onclick = function() {
        if (importConfirmOverlay) importConfirmOverlay.classList.remove('active');
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = function(e) {
          var file = e.target.files[0];
          if(!file) return;
          var reader = new FileReader();
          reader.onload = function(evt) {
            try {
              var imported = JSON.parse(evt.target.result);
              if(imported && imported.birthDate && imported.lifeExp !== undefined) {
                LC.ud = imported;
                if(!LC.ud.events) LC.ud.events = [];
                LC.save();
                LC.originalLifeExp = LC.ud.lifeExp;
                alert(LC.t('import_success', '导入成功！页面将刷新'));
                location.reload();
              } else {
                alert(LC.t('import_format_error', '文件格式不正确，请选择正确的人生日历备份文件'));
              }
            } catch(err) {
              alert(LC.t('import_parse_error', '解析失败：') + err.message);
            }
          };
          reader.readAsText(file);
        };
        input.click();
      };
    }
    if (importConfirmOverlay) {
      importConfirmOverlay.onclick = function(e) {
        if(e.target === importConfirmOverlay) {
          importConfirmOverlay.classList.remove('active');
        }
      };
    }
  }
  
  function showImportConfirmDialog() {
    importConfirmOverlay = createImportConfirmDialog();
    importConfirmOverlay.classList.add('active');
    rebindImportButtons();
  }
  
  if (toolboxImport) {
    toolboxImport.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
      showImportConfirmDialog();
    });
  }
  
  if (toolboxLogout) {
    toolboxLogout.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
      LC.logoutToInput();
    });
  }
  
  updateToolboxText();
  
  var originalRefreshText = LC.refreshText;
  LC.refreshText = function() {
    if (originalRefreshText) originalRefreshText();
    updateToolboxText();
    refreshImportDialog();
    LC.optimizeMobileButtonText();
    LC.refreshMobileLangMenu();
    var mobileBtn = document.getElementById('mobileToolboxBtn');
    if (mobileBtn && window.innerWidth <= 768) {
      mobileBtn.title = LC.t('toolbox_title', '工具箱');
    }
  };
})();
