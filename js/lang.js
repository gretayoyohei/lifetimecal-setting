/* ========= 安全获取翻译文本 ========= */
LC.D = {};
LC.defLang = function(code, obj) { LC.D[code] = obj; };
LC.t = function(k, fallback) {
  try { var v = LC.D[LC.curLang][k]; if (v !== undefined) return v; } catch (e) {}
  return fallback || k;
};
LC.tf = function(k, vals, fallback) {
  var s = LC.t(k, fallback);
  if (!vals) return s;
  for (var p in vals) {
    var re = new RegExp('\\{' + p + '\\}', 'g');
    s = s.replace(re, vals[p]);
  }
  return s;
};

/* ========= 语言顺序配置 ========= */
LC.langOrder = [
  'en', 'zh-CN', 'zh-TW',
  'es', 'ja', 'ko', 'fr', 'de', 'it', 'pt', 'ru', 'ar', 'hi', 'th'
];

/* ========= 语言包 ========= */

// 英语
LC.defLang('en', {
  nm: 'English', ct: 'Customize My Life Calendar', cs: 'Fill in your info, zoom to travel through your life',
  ln: 'My Name', lb: 'My Birth Date', ll: 'I hope I can live to', uy: 'years old',
  bg: '✦ Start My Life Journey ✦', am: 'Dear, expected age cannot exceed 120 💗',
  al: 'Dear 💗, stop teasing~ You are already {a}. Please enter an age greater than your actual age.',
  zh: 'Scroll to zoom · Dive into your life', ov: 'Overview', bt: 'Today', ex: 'Logout',
  ty: 'This Year', tm: 'This Month', vl: 'Life Overview', vm: 'Month View', vd: 'Day View',
  et: 'New Event', em: 'Time', ed: 'Description (optional)', sv: 'Save', cn: 'Cancel',
  dl: 'Delete', ne: 'No events', fa: 'Please fill in all required fields', bf: 'Birth date cannot be in the future',
  mo: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  tp: { w: 'Work', p: 'Personal', h: 'Health', s: 'Study', i: 'Important', a: 'Anniversary', b: 'Birthday', o: 'Other' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'Your name', ph_smart: 'Try typing "Dinner at 7pm tomorrow"',
  allday: 'All Day', start: 'Start', end: 'End', repeat: 'Repeat', location: 'Location', notes: 'Notes',
  rp_n: 'Once', rp_d: 'Daily', rp_w: 'Weekly', rp_m: 'Monthly', rp_y: 'Yearly',
  sb: 'Schedule Details', sbt: 'All Day Events', sbh: '{h}:00', yr: 'Year', mn: 'Month', dy: 'Day',
  confirm_del: 'Cannot recover after deletion. Confirm delete?', yes: 'Confirm', no: 'Cancel',
  edit: 'Edit Event', del: 'Delete Event', confirm_del_recurring: 'Delete this recurring event?',
  del_all: 'Delete all events', del_single: 'Delete only this one',
  lifeWarn: '⚠️ Events from year {y} and beyond will not be shown, but not lost. Change back to {oldEnd} years old to see them again.',
  lifeWarnShort: 'After changing life expectancy from {old} to {new},\n\nevents from year {year} and beyond will not be shown.\n\nChange back to {old} years old to restore them.\n\nAre you sure you want to continue?',
  toolbox_title: 'Toolbox', toolbox_export: 'Export Events', toolbox_import: 'Import Events', toolbox_logout: 'Logout',
  tooltip_export: '🔒 For privacy, events are stored only in your browser. Clearing cache or changing devices will lose them. Export regularly to back up.',
  import_warning_title: '⚠️ Import Will Override Existing Events',
  import_warning_text: 'Imported event file will completely replace all your current events. This action is irreversible.',
  import_suggestion: 'It is recommended to export current events as backup before importing.',
  import_confirm: 'Confirm Import', import_cancel: 'Cancel', import_success: 'Import successful! Page will refresh.',
  import_format_error: 'Invalid file format. Please select a valid life calendar backup file.',
  import_parse_error: 'Parse failed: ', todo_title: 'To-Do List', todo_empty: 'No pending tasks',
  // 提醒相关
  remind: 'Remind',
  remind_none: 'No reminder',
  remind_on_time: 'On time',
  remind_5m: '5 minutes before',
  remind_15m: '15 minutes before',
  remind_30m: '30 minutes before',
  remind_1h: '1 hour before',
  remind_2h: '2 hours before',
  remind_1d: '1 day before',
  remind_2d: '2 days before',
  remind_3d: '3 days before',
  remind_1w: '1 week before',
  remind_body: '"{title}" will start at {time} on {date}',
  remind_body_all_day: '"{title}" is an all-day event on {date}'
});

// 简体中文
LC.defLang('zh-CN', {
  nm: '中文（简体）', ct: '定制我的人生日历', cs: '填写信息，用滚轮缩放穿越你的一生',
  ln: '我的名字', lb: '我的出生日期', ll: '我希望我能活到', uy: '岁',
  bg: '✦ 开启人生之旅 ✦', am: '亲爱的，预计年龄不能超过120岁哦💗',
  al: '亲爱的💗，别调皮~你已经{a}了哦。请填写比你实际年龄大的岁数。',
  zh: '滚动鼠标滚轮 · 深入你的生命', ov: '全局', bt: '今天', ex: '登出', ty: '今年', tm: '本月',
  vl: '生命全貌', vm: '月视图', vd: '日视图', et: '新建日程', em: '时间', ed: '描述(可选)',
  sv: '保存', cn: '取消', dl: '删除', ne: '暂无日程', fa: '请填写所有必填项', bf: '出生日期不能是未来',
  mo: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  wd: ['日', '一', '二', '三', '四', '五', '六'],
  tp: { w: '工作', p: '个人', h: '健康', s: '学习', i: '重要事项', a: '纪念日', b: '生日', o: '其他' },
  ml: '{y} {m}', ym: '{y}年{m}', ph_name: '你的名字', ph_smart: '试着输入"明晚7点聚餐"',
  allday: '全天', start: '开始', end: '结束', repeat: '重复', location: '地点', notes: '备注',
  rp_n: '一次性日程', rp_d: '每天', rp_w: '每周', rp_m: '每月', rp_y: '每年',
  sb: '日程详情', sbt: '全天日程', sbh: '{h}:00', yr: '年', mn: '月', dy: '日',
  confirm_del: '删除后无法恢复，确认删除该日程吗？', yes: '确认', no: '取消',
  edit: '编辑日程', del: '删除日程', confirm_del_recurring: '确定删除此重复日程吗？',
  del_all: '删除所有日程', del_single: '仅删除此日程',
  lifeWarn: '⚠️ {y}年及之后的日程将不再显示，但这些日程不会丢失。改回{oldEnd}岁后可重新查看。',
  lifeWarnShort: '将寿命从 {old} 岁改为 {new} 岁后，\n\n{year} 年及之后的日程将不再显示。\n\n改回 {old} 岁即可恢复。\n\n确定继续吗？',
  toolbox_title: '工具箱', toolbox_export: '导出日程', toolbox_import: '导入日程', toolbox_logout: '登出',
  tooltip_export: '🔒 为保护隐私，日程只存在您浏览器中。换设备或清缓存会丢失，建议定期导出日程备份。',
  import_warning_title: '⚠️ 导入将覆盖现有日程',
  import_warning_text: '导入的日程文档将完全替换您当前的所有日程数据，此操作不可撤销。',
  import_suggestion: '建议在导入前先「导出日程」备份现有数据。',
  import_confirm: '确认导入', import_cancel: '取消', import_success: '导入成功！页面将刷新',
  import_format_error: '文件格式不正确，请选择正确的人生日历备份文件',
  import_parse_error: '解析失败：', todo_title: '待办日程', todo_empty: '暂无待办日程',
  // 提醒相关
  remind: '提醒',
  remind_none: '无提醒',
  remind_on_time: '准时',
  remind_5m: '5分钟前',
  remind_15m: '15分钟前',
  remind_30m: '30分钟前',
  remind_1h: '1小时前',
  remind_2h: '2小时前',
  remind_1d: '1天前',
  remind_2d: '2天前',
  remind_3d: '3天前',
  remind_1w: '1周前',
  remind_body: '“{title}” 将于 {date} {time} 开始',
  remind_body_all_day: '“{title}” 是 {date} 的全天日程'
});

// 繁体中文
LC.defLang('zh-TW', {
  nm: '中文（繁體）', ct: '定製我的人生日曆', cs: '填寫資訊，用滾輪縮放穿越你的一生',
  ln: '我的名字', lb: '我的出生日期', ll: '我希望我能活到', uy: '歲',
  bg: '✦ 開啟人生之旅 ✦', am: '親愛的，預計年齡不能超過120歲哦💗',
  al: '親愛的💗，別調皮~你已經{a}了哦。請填寫比你實際年齡大的歲數。',
  zh: '滾動滑鼠滾輪 · 深入你的生命', ov: '全局', bt: '今天', ex: '登出', ty: '今年', tm: '本月',
  vl: '生命全貌', vm: '月檢視', vd: '日檢視', et: '新建日程', em: '時間', ed: '描述(選填)',
  sv: '儲存', cn: '取消', dl: '刪除', ne: '暫無日程', fa: '請填寫所有必填項', bf: '出生日期不能是未來',
  mo: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  wd: ['日', '一', '二', '三', '四', '五', '六'],
  tp: { w: '工作', p: '個人', h: '健康', s: '學習', i: '重要事項', a: '紀念日', b: '生日', o: '其他' },
  ml: '{y} {m}', ym: '{y}年{m}', ph_name: '你的名字', ph_smart: '試著輸入"明晚7點聚餐"',
  allday: '全天', start: '開始', end: '結束', repeat: '重複', location: '地點', notes: '備註',
  rp_n: '一次性日程', rp_d: '每天', rp_w: '每週', rp_m: '每月', rp_y: '每年',
  sb: '日程詳情', sbt: '全天日程', sbh: '{h}:00', yr: '年', mn: '月', dy: '日',
  confirm_del: '刪除後無法恢復，確認刪除該日程嗎？', yes: '確認', no: '取消',
  edit: '編輯日程', del: '刪除日程', confirm_del_recurring: '確定刪除此重複日程嗎？',
  del_all: '刪除所有日程', del_single: '僅刪除此日程',
  lifeWarn: '⚠️ {y}年及之後的日程將不再顯示，但這些日程不會丟失。改回{oldEnd}歲後可重新查看。',
  lifeWarnShort: '將壽命從 {old} 歲改為 {new} 歲後，\n\n{year} 年及之後的日程將不再顯示。\n\n改回 {old} 歲即可恢復。\n\n確定繼續嗎？',
  toolbox_title: '工具箱', toolbox_export: '匯出日程', toolbox_import: '匯入日程', toolbox_logout: '登出',
  tooltip_export: '🔒 為保護隱私，日程只存在您瀏覽器中。換設備或清緩存會丟失，建議定期匯出日程備份。',
  import_warning_title: '⚠️ 匯入將覆蓋現有日程',
  import_warning_text: '匯入的日程文件將完全替換您當前的所有日程數據，此操作不可撤銷。',
  import_suggestion: '建議在匯入前先「匯出日程」備份現有數據。',
  import_confirm: '確認匯入', import_cancel: '取消', import_success: '匯入成功！頁面將刷新',
  import_format_error: '文件格式不正確，請選擇正確的人生日曆備份文件',
  import_parse_error: '解析失敗：', todo_title: '待辦日程', todo_empty: '暫無待辦日程',
  // 提醒相关
  remind: '提醒',
  remind_none: '無提醒',
  remind_on_time: '準時',
  remind_5m: '5分鐘前',
  remind_15m: '15分鐘前',
  remind_30m: '30分鐘前',
  remind_1h: '1小時前',
  remind_2h: '2小時前',
  remind_1d: '1天前',
  remind_2d: '2天前',
  remind_3d: '3天前',
  remind_1w: '1週前',
  remind_body: '「{title}」 將於 {date} {time} 開始',
  remind_body_all_day: '「{title}」 是 {date} 的全天日程'
});

// 西班牙语
LC.defLang('es', {
  nm: 'Español', ct: 'Personaliza Mi Calendario Vital', cs: 'Completa tus datos, zoom para viajar por tu vida',
  ln: 'Mi Nombre', lb: 'Mi Fecha de Nacimiento', ll: 'Espero vivir hasta', uy: 'años',
  bg: '✦ Inicia Mi Viaje Vital ✦', am: 'Querido, la edad esperada no puede superar 120 💗',
  al: 'Querido 💗, no bromees~ Ya tienes {a}. Por favor ingresa una edad mayor a tu edad real.',
  zh: 'Desplázate para hacer zoom · Sumérgete en tu vida', ov: 'Vista General', bt: 'Hoy', ex: 'Cerrar Sesión',
  ty: 'Este Año', tm: 'Este Mes', vl: 'Vista General de Vida', vm: 'Vista de Mes', vd: 'Vista de Día',
  et: 'Nuevo Evento', em: 'Hora', ed: 'Descripción (opcional)', sv: 'Guardar', cn: 'Cancelar',
  dl: 'Eliminar', ne: 'Sin eventos', fa: 'Por favor completa todos los campos obligatorios', bf: 'La fecha de nacimiento no puede ser futura',
  mo: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  wd: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  tp: { w: 'Trabajo', p: 'Personal', h: 'Salud', s: 'Estudio', i: 'Importante', a: 'Aniversario', b: 'Cumpleaños', o: 'Otro' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'Tu nombre', ph_smart: 'Prueba escribir "Cena mañana a las 7pm"',
  allday: 'Todo el día', start: 'Inicio', end: 'Fin', repeat: 'Repetir', location: 'Lugar', notes: 'Notas',
  rp_n: 'Una vez', rp_d: 'Diario', rp_w: 'Semanal', rp_m: 'Mensual', rp_y: 'Anual',
  sb: 'Detalles del Evento', sbt: 'Eventos de Todo el Día', sbh: '{h}:00', yr: 'Año', mn: 'Mes', dy: 'Día',
  confirm_del: 'No se puede recuperar después de eliminar. ¿Confirmar eliminación?', yes: 'Confirmar', no: 'Cancelar',
  edit: 'Editar Evento', del: 'Eliminar Evento', confirm_del_recurring: '¿Eliminar este evento recurrente?',
  del_all: 'Eliminar todos los eventos', del_single: 'Eliminar solo este',
  lifeWarn: '⚠️ Los eventos desde el año {y} en adelante no se mostrarán, pero no se perderán. Vuelve a {oldEnd} años para verlos de nuevo.',
  lifeWarnShort: 'Después de cambiar la esperanza de vida de {old} a {new},\n\nlos eventos desde el año {year} en adelante no se mostrarán.\n\nVuelve a {old} años para restaurarlos.\n\n¿Seguro que quieres continuar?',
  toolbox_title: 'Caja de Herramientas', toolbox_export: 'Exportar Eventos', toolbox_import: 'Importar Eventos', toolbox_logout: 'Cerrar Sesión',
  tooltip_export: '🔒 Por privacidad, los eventos solo se almacenan en tu navegador. Limpiar caché o cambiar de dispositivo los perderá. Exporta regularmente para respaldar.',
  import_warning_title: '⚠️ La importación sobrescribirá los eventos existentes',
  import_warning_text: 'El archivo de eventos importado reemplazará completamente todos tus eventos actuales. Esta acción es irreversible.',
  import_suggestion: 'Se recomienda exportar los eventos actuales como respaldo antes de importar.',
  import_confirm: 'Confirmar Importación', import_cancel: 'Cancelar', import_success: '¡Importación exitosa! La página se actualizará',
  import_format_error: 'Formato de archivo inválido. Selecciona un archivo de respaldo válido.',
  import_parse_error: 'Error de análisis: ', todo_title: 'Lista de Tareas', todo_empty: 'No hay tareas pendientes',
  // 提醒相关
  remind: 'Recordar',
  remind_none: 'Sin recordatorio',
  remind_on_time: 'En punto',
  remind_5m: '5 minutos antes',
  remind_15m: '15 minutos antes',
  remind_30m: '30 minutos antes',
  remind_1h: '1 hora antes',
  remind_2h: '2 horas antes',
  remind_1d: '1 día antes',
  remind_2d: '2 días antes',
  remind_3d: '3 días antes',
  remind_1w: '1 semana antes',
  remind_body: '"{title}" comenzará a las {time} del {date}',
  remind_body_all_day: '"{title}" es un evento de día completo el {date}'
});

// 日语
LC.defLang('ja', {
  nm: '日本語', ct: '人生カレンダーをカスタマイズ', cs: '情報を入力し、ズームして人生を旅する',
  ln: '名前', lb: '生年月日', ll: '私は生きたい', uy: '歳',
  bg: '✦ 人生の旅を始める ✦', am: '予定年齢は120歳を超えられません 💗',
  al: '💗 いたずらしないで～ あなたはもう{a}歳です。実際の年齢より大きい年齢を入力してください。',
  zh: 'スクロールでズーム · あなたの人生に没入', ov: '全体表示', bt: '今日', ex: 'ログアウト',
  ty: '今年', tm: '今月', vl: '人生の全体像', vm: '月表示', vd: '日表示',
  et: '新規予定', em: '時間', ed: '説明（任意）', sv: '保存', cn: 'キャンセル',
  dl: '削除', ne: '予定なし', fa: '必須項目をすべて入力してください', bf: '生年月日は未来にできません',
  mo: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  wd: ['日', '月', '火', '水', '木', '金', '土'],
  tp: { w: '仕事', p: '個人', h: '健康', s: '学習', i: '重要', a: '記念日', b: '誕生日', o: 'その他' },
  ml: '{y} {m}', ym: '{y}年{m}月', ph_name: 'あなたの名前', ph_smart: '"明日の夜7時に夕食" と入力してみてください',
  allday: '終日', start: '開始', end: '終了', repeat: '繰り返し', location: '場所', notes: 'メモ',
  rp_n: '一回限り', rp_d: '毎日', rp_w: '毎週', rp_m: '毎月', rp_y: '毎年',
  sb: '予定詳細', sbt: '終日予定', sbh: '{h}:00', yr: '年', mn: '月', dy: '日',
  confirm_del: '削除後は復元できません。削除しますか？', yes: '確認', no: 'キャンセル',
  edit: '予定を編集', del: '予定を削除', confirm_del_recurring: 'この繰り返し予定を削除しますか？',
  del_all: 'すべての予定を削除', del_single: 'この予定のみ削除',
  lifeWarn: '⚠️ {y}年以降の予定は表示されなくなりますが、失われません。{oldEnd}歳に戻すと再表示されます。',
  lifeWarnShort: '寿命を{old}歳から{new}歳に変更すると、\n\n{year}年以降の予定は表示されなくなります。\n\n{old}歳に戻すと復元されます。\n\n続行しますか？',
  toolbox_title: 'ツールボックス', toolbox_export: '予定をエクスポート', toolbox_import: '予定をインポート', toolbox_logout: 'ログアウト',
  tooltip_export: '🔒 プライバシー保護のため、予定はブラウザ内のみに保存されます。キャッシュを消去したりデバイスを変更すると失われます。定期的にエクスポートしてバックアップしてください。',
  import_warning_title: '⚠️ インポートは既存の予定を上書きします',
  import_warning_text: 'インポートした予定ファイルは現在のすべての予定を完全に置き換えます。この操作は元に戻せません。',
  import_suggestion: 'インポートする前に、現在の予定をエクスポートしてバックアップすることをお勧めします。',
  import_confirm: 'インポートを確認', import_cancel: 'キャンセル', import_success: 'インポート成功！ページをリフレッシュします',
  import_format_error: 'ファイル形式が正しくありません。有効なバックアップファイルを選択してください。',
  import_parse_error: '解析失敗：', todo_title: 'ToDoリスト', todo_empty: '未完了のタスクはありません',
  // 提醒相关
  remind: 'リマインダー',
  remind_none: 'リマインダーなし',
  remind_on_time: 'ちょうど',
  remind_5m: '5分前',
  remind_15m: '15分前',
  remind_30m: '30分前',
  remind_1h: '1時間前',
  remind_2h: '2時間前',
  remind_1d: '1日前',
  remind_2d: '2日前',
  remind_3d: '3日前',
  remind_1w: '1週間前',
  remind_body: '「{title}」は{date}の{time}に開始します',
  remind_body_all_day: '「{title}」は{date}の終日イベントです'
});

// 韩语
LC.defLang('ko', {
  nm: '한국어', ct: '내 인생 달력 맞춤 설정', cs: '정보를 입력하고 확대/축소하여 인생 여행을 떠나세요',
  ln: '이름', lb: '생년월일', ll: '나는 살고 싶다', uy: '세',
  bg: '✦ 인생 여행 시작 ✦', am: '예상 연령은 120세를 초과할 수 없습니다 💗',
  al: '💗 장난치지 마세요~ 당신은 이미 {a}세입니다. 실제 나이보다 큰 나이를 입력하세요.',
  zh: '스크롤로 확대/축소 · 당신의 인생에 빠져보세요', ov: '전체보기', bt: '오늘', ex: '로그아웃',
  ty: '올해', tm: '이번 달', vl: '인생 전체보기', vm: '월간 보기', vd: '일간 보기',
  et: '새 일정', em: '시간', ed: '설명(선택사항)', sv: '저장', cn: '취소',
  dl: '삭제', ne: '일정 없음', fa: '필수 항목을 모두 입력하세요', bf: '생년월일은 미래일 수 없습니다',
  mo: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  wd: ['일', '월', '화', '수', '목', '금', '토'],
  tp: { w: '업무', p: '개인', h: '건강', s: '학습', i: '중요', a: '기념일', b: '생일', o: '기타' },
  ml: '{y} {m}', ym: '{y}년 {m}월', ph_name: '이름', ph_smart: '"내일 저녁 7시에 저녁 식사"라고 입력해보세요',
  allday: '종일', start: '시작', end: '종료', repeat: '반복', location: '장소', notes: '메모',
  rp_n: '한 번', rp_d: '매일', rp_w: '매주', rp_m: '매월', rp_y: '매년',
  sb: '일정 상세', sbt: '종일 일정', sbh: '{h}:00', yr: '년', mn: '월', dy: '일',
  confirm_del: '삭제 후 복구할 수 없습니다. 삭제하시겠습니까?', yes: '확인', no: '취소',
  edit: '일정 편집', del: '일정 삭제', confirm_del_recurring: '이 반복 일정을 삭제하시겠습니까?',
  del_all: '모든 일정 삭제', del_single: '이 일정만 삭제',
  lifeWarn: '⚠️ {y}년 이후의 일정은 표시되지 않지만 손실되지는 않습니다. {oldEnd}세로 되돌리면 다시 볼 수 있습니다.',
  lifeWarnShort: '수명을 {old}세에서 {new}세로 변경하면\n\n{year}년 이후의 일정이 표시되지 않습니다.\n\n{old}세로 되돌리면 복원됩니다.\n\n계속하시겠습니까?',
  toolbox_title: '도구 상자', toolbox_export: '일정 내보내기', toolbox_import: '일정 가져오기', toolbox_logout: '로그아웃',
  tooltip_export: '🔒 개인정보 보호를 위해 일정은 브라우저에만 저장됩니다. 캐시 삭제나 기기 변경 시 손실됩니다. 정기적으로 내보내기하여 백업하세요.',
  import_warning_title: '⚠️ 가져오기는 기존 일정을 덮어씁니다',
  import_warning_text: '가져온 일정 파일이 현재 모든 일정을 완전히 대체합니다. 이 작업은 되돌릴 수 없습니다.',
  import_suggestion: '가져오기 전에 현재 일정을 내보내기하여 백업하는 것이 좋습니다.',
  import_confirm: '가져오기 확인', import_cancel: '취소', import_success: '가져오기 성공! 페이지가 새로고침됩니다',
  import_format_error: '파일 형식이 올바르지 않습니다. 유효한 백업 파일을 선택하세요.',
  import_parse_error: '분석 실패: ', todo_title: '할 일 목록', todo_empty: '대기 중인 작업 없음',
  // 提醒相关
  remind: '알림',
  remind_none: '알림 없음',
  remind_on_time: '정시',
  remind_5m: '5분 전',
  remind_15m: '15분 전',
  remind_30m: '30분 전',
  remind_1h: '1시간 전',
  remind_2h: '2시간 전',
  remind_1d: '1일 전',
  remind_2d: '2일 전',
  remind_3d: '3일 전',
  remind_1w: '1주일 전',
  remind_body: '"{title}"이(가) {date} {time}에 시작합니다',
  remind_body_all_day: '"{title}"은(는) {date}의 종일 일정입니다'
});

// 法语
LC.defLang('fr', {
  nm: 'Français', ct: 'Personnaliser Mon Calendrier de Vie', cs: 'Remplissez vos infos, zoomez pour voyager dans votre vie',
  ln: 'Mon Nom', lb: 'Ma Date de Naissance', ll: 'J\'espère vivre jusqu\'à', uy: 'ans',
  bg: '✦ Commencer Mon Voyage de Vie ✦', am: 'Cher, l\'âge prévu ne peut pas dépasser 120 💗',
  al: 'Cher 💗, arrête de plaisanter~ Tu as déjà {a}. Veuillez entrer un âge supérieur à votre âge réel.',
  zh: 'Défiler pour zoomer · Plongez dans votre vie', ov: 'Vue d\'ensemble', bt: 'Aujourd\'hui', ex: 'Déconnexion',
  ty: 'Cette Année', tm: 'Ce Mois', vl: 'Aperçu de la Vie', vm: 'Vue Mensuelle', vd: 'Vue Quotidienne',
  et: 'Nouvel Événement', em: 'Heure', ed: 'Description (optionnel)', sv: 'Enregistrer', cn: 'Annuler',
  dl: 'Supprimer', ne: 'Aucun événement', fa: 'Veuillez remplir tous les champs obligatoires', bf: 'La date de naissance ne peut pas être dans le futur',
  mo: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
  wd: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  tp: { w: 'Travail', p: 'Personnel', h: 'Santé', s: 'Étude', i: 'Important', a: 'Anniversaire', b: 'Anniv.', o: 'Autre' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'Votre nom', ph_smart: 'Essayez "Dîner demain à 19h"',
  allday: 'Toute la journée', start: 'Début', end: 'Fin', repeat: 'Répéter', location: 'Lieu', notes: 'Notes',
  rp_n: 'Une fois', rp_d: 'Quotidien', rp_w: 'Hebdomadaire', rp_m: 'Mensuel', rp_y: 'Annuel',
  sb: 'Détails de l\'événement', sbt: 'Événements toute la journée', sbh: '{h}:00', yr: 'Année', mn: 'Mois', dy: 'Jour',
  confirm_del: 'Suppression irréversible. Confirmer la suppression ?', yes: 'Confirmer', no: 'Annuler',
  edit: 'Modifier', del: 'Supprimer', confirm_del_recurring: 'Supprimer cet événement récurrent ?',
  del_all: 'Supprimer tous les événements', del_single: 'Supprimer uniquement celui-ci',
  lifeWarn: '⚠️ Les événements à partir de l\'année {y} ne seront pas affichés, mais ne seront pas perdus. Revenez à {oldEnd} ans pour les revoir.',
  lifeWarnShort: 'Après avoir changé l\'espérance de vie de {old} à {new},\n\nles événements à partir de l\'année {year} ne seront pas affichés.\n\nRevenez à {old} ans pour les restaurer.\n\nVoulez-vous vraiment continuer ?',
  toolbox_title: 'Boîte à outils', toolbox_export: 'Exporter les événements', toolbox_import: 'Importer des événements', toolbox_logout: 'Déconnexion',
  tooltip_export: '🔒 Pour la confidentialité, les événements sont stockés uniquement dans votre navigateur. Vider le cache ou changer d\'appareil les fera perdre. Exportez régulièrement pour sauvegarder.',
  import_warning_title: '⚠️ L\'importation remplacera les événements existants',
  import_warning_text: 'Le fichier importé remplacera complètement tous vos événements actuels. Cette action est irréversible.',
  import_suggestion: 'Il est recommandé d\'exporter les événements actuels comme sauvegarde avant d\'importer.',
  import_confirm: 'Confirmer l\'importation', import_cancel: 'Annuler', import_success: 'Importation réussie ! La page va être actualisée',
  import_format_error: 'Format de fichier invalide. Veuillez sélectionner un fichier de sauvegarde valide.',
  import_parse_error: 'Échec de l\'analyse : ', todo_title: 'Liste de tâches', todo_empty: 'Aucune tâche en attente',
  // 提醒相关
  remind: 'Rappeler',
  remind_none: 'Pas de rappel',
  remind_on_time: 'À l\'heure',
  remind_5m: '5 minutes avant',
  remind_15m: '15 minutes avant',
  remind_30m: '30 minutes avant',
  remind_1h: '1 heure avant',
  remind_2h: '2 heures avant',
  remind_1d: '1 jour avant',
  remind_2d: '2 jours avant',
  remind_3d: '3 jours avant',
  remind_1w: '1 semaine avant',
  remind_body: '"{title}" commence à {time} le {date}',
  remind_body_all_day: '"{title}" est un événement toute la journée le {date}'
});

// 德语
LC.defLang('de', {
  nm: 'Deutsch', ct: 'Meinen Lebenskalender anpassen', cs: 'Gib deine Daten ein, zoome und reise durch dein Leben',
  ln: 'Mein Name', lb: 'Mein Geburtsdatum', ll: 'Ich hoffe, ich werde', uy: 'Jahre alt',
  bg: '✦ Beginne meine Lebensreise ✦', am: 'Lieber, das erwartete Alter kann 120 nicht überschreiten 💗',
  al: 'Lieber 💗, hör auf zu scherzen~ Du bist bereits {a}. Bitte gib ein Alter ein, das größer ist als dein tatsächliches Alter.',
  zh: 'Scrolle zum Zoomen · Tauche in dein Leben ein', ov: 'Gesamtübersicht', bt: 'Heute', ex: 'Abmelden',
  ty: 'Dieses Jahr', tm: 'Diesen Monat', vl: 'Lebensübersicht', vm: 'Monatsansicht', vd: 'Tagesansicht',
  et: 'Neues Ereignis', em: 'Zeit', ed: 'Beschreibung (optional)', sv: 'Speichern', cn: 'Abbrechen',
  dl: 'Löschen', ne: 'Keine Ereignisse', fa: 'Bitte fülle alle Pflichtfelder aus', bf: 'Geburtsdatum kann nicht in der Zukunft liegen',
  mo: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  wd: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  tp: { w: 'Arbeit', p: 'Persönlich', h: 'Gesundheit', s: 'Lernen', i: 'Wichtig', a: 'Jahrestag', b: 'Geburtstag', o: 'Andere' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'Dein Name', ph_smart: 'Versuche "Abendessen morgen um 19 Uhr"',
  allday: 'Ganztägig', start: 'Start', end: 'Ende', repeat: 'Wiederholen', location: 'Ort', notes: 'Notizen',
  rp_n: 'Einmalig', rp_d: 'Täglich', rp_w: 'Wöchentlich', rp_m: 'Monatlich', rp_y: 'Jährlich',
  sb: 'Ereignisdetails', sbt: 'Ganztägige Ereignisse', sbh: '{h}:00', yr: 'Jahr', mn: 'Monat', dy: 'Tag',
  confirm_del: 'Kann nach dem Löschen nicht wiederhergestellt werden. Löschen bestätigen?', yes: 'Bestätigen', no: 'Abbrechen',
  edit: 'Bearbeiten', del: 'Löschen', confirm_del_recurring: 'Dieses wiederkehrende Ereignis löschen?',
  del_all: 'Alle Ereignisse löschen', del_single: 'Nur dieses löschen',
  lifeWarn: '⚠️ Ereignisse ab dem Jahr {y} werden nicht angezeigt, aber nicht verloren. Zurück zu {oldEnd} Jahren, um sie wiederzusehen.',
  lifeWarnShort: 'Nach Änderung der Lebenserwartung von {old} auf {new}\n\nwerden Ereignisse ab dem Jahr {year} nicht mehr angezeigt.\n\nZurück zu {old} Jahren stellt sie wieder her.\n\nMöchten Sie wirklich fortfahren?',
  toolbox_title: 'Werkzeugkasten', toolbox_export: 'Ereignisse exportieren', toolbox_import: 'Ereignisse importieren', toolbox_logout: 'Abmelden',
  tooltip_export: '🔒 Aus Datenschutzgründen werden Ereignisse nur in Ihrem Browser gespeichert. Cache leeren oder Gerät wechseln führt zu Verlust. Regelmäßig exportieren für ein Backup.',
  import_warning_title: '⚠️ Import überschreibt vorhandene Ereignisse',
  import_warning_text: 'Die importierte Datei ersetzt vollständig alle Ihre aktuellen Ereignisse. Diese Aktion ist irreversibel.',
  import_suggestion: 'Es wird empfohlen, vor dem Import die aktuellen Ereignisse zu exportieren.',
  import_confirm: 'Import bestätigen', import_cancel: 'Abbrechen', import_success: 'Import erfolgreich! Seite wird neu geladen',
  import_format_error: 'Ungültiges Dateiformat. Bitte wählen Sie eine gültige Backup-Datei.',
  import_parse_error: 'Parse-Fehler: ', todo_title: 'Aufgabenliste', todo_empty: 'Keine ausstehenden Aufgaben',
  // 提醒相关
  remind: 'Erinnern',
  remind_none: 'Keine Erinnerung',
  remind_on_time: 'Pünktlich',
  remind_5m: '5 Minuten vorher',
  remind_15m: '15 Minuten vorher',
  remind_30m: '30 Minuten vorher',
  remind_1h: '1 Stunde vorher',
  remind_2h: '2 Stunden vorher',
  remind_1d: '1 Tag vorher',
  remind_2d: '2 Tage vorher',
  remind_3d: '3 Tage vorher',
  remind_1w: '1 Woche vorher',
  remind_body: '"{title}" beginnt am {date} um {time}',
  remind_body_all_day: '"{title}" ist eine ganztägige Veranstaltung am {date}'
});

// 意大利语
LC.defLang('it', {
  nm: 'Italiano', ct: 'Personalizza il Mio Calendario della Vita', cs: 'Inserisci i tuoi dati, zoom per viaggiare nella tua vita',
  ln: 'Il Mio Nome', lb: 'La Mia Data di Nascita', ll: 'Spero di vivere fino a', uy: 'anni',
  bg: '✦ Inizia il Mio Viaggio nella Vita ✦', am: 'Caro, l\'età prevista non può superare 120 💗',
  al: 'Caro 💗, smettila di scherzare~ Hai già {a}. Inserisci un\'età maggiore della tua età reale.',
  zh: 'Scorri per zoomare · Immergiti nella tua vita', ov: 'Panoramica', bt: 'Oggi', ex: 'Disconnetti',
  ty: 'Quest\'Anno', tm: 'Questo Mese', vl: 'Panoramica della Vita', vm: 'Vista Mensile', vd: 'Vista Giornaliera',
  et: 'Nuovo Evento', em: 'Ora', ed: 'Descrizione (opzionale)', sv: 'Salva', cn: 'Annulla',
  dl: 'Elimina', ne: 'Nessun evento', fa: 'Compila tutti i campi obbligatori', bf: 'La data di nascita non può essere futura',
  mo: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
  wd: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
  tp: { w: 'Lavoro', p: 'Personale', h: 'Salute', s: 'Studio', i: 'Importante', a: 'Anniversario', b: 'Compleanno', o: 'Altro' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'Il tuo nome', ph_smart: 'Prova a scrivere "Cena domani alle 19:00"',
  allday: 'Giornata intera', start: 'Inizio', end: 'Fine', repeat: 'Ripeti', location: 'Luogo', notes: 'Note',
  rp_n: 'Una volta', rp_d: 'Ogni giorno', rp_w: 'Ogni settimana', rp_m: 'Ogni mese', rp_y: 'Ogni anno',
  sb: 'Dettagli evento', sbt: 'Eventi giornata intera', sbh: '{h}:00', yr: 'Anno', mn: 'Mese', dy: 'Giorno',
  confirm_del: 'Impossibile recuperare dopo l\'eliminazione. Confermare l\'eliminazione?', yes: 'Conferma', no: 'Annulla',
  edit: 'Modifica evento', del: 'Elimina evento', confirm_del_recurring: 'Eliminare questo evento ricorrente?',
  del_all: 'Elimina tutti gli eventi', del_single: 'Elimina solo questo',
  lifeWarn: '⚠️ Gli eventi dall\'anno {y} in poi non saranno visualizzati, ma non andranno persi. Torna a {oldEnd} anni per rivederli.',
  lifeWarnShort: 'Dopo aver cambiato l\'aspettativa di vita da {old} a {new},\n\ngli eventi dall\'anno {year} in poi non saranno visualizzati.\n\nTorna a {old} anni per ripristinarli.\n\nSei sicuro di voler continuare?',
  toolbox_title: 'Cassetta degli attrezzi', toolbox_export: 'Esporta eventi', toolbox_import: 'Importa eventi', toolbox_logout: 'Disconnetti',
  tooltip_export: '🔒 Per la privacy, gli eventi sono memorizzati solo nel tuo browser. Cancellare la cache o cambiare dispositivo li farà perdere. Esporta regolarmente per fare un backup.',
  import_warning_title: '⚠️ L\'importazione sovrascriverà gli eventi esistenti',
  import_warning_text: 'Il file importato sostituirà completamente tutti i tuoi eventi attuali. Questa azione è irreversibile.',
  import_suggestion: 'Si consiglia di esportare gli eventi attuali come backup prima di importare.',
  import_confirm: 'Conferma importazione', import_cancel: 'Annulla', import_success: 'Importazione riuscita! La pagina verrà aggiornata',
  import_format_error: 'Formato file non valido. Seleziona un file di backup valido.',
  import_parse_error: 'Errore di analisi: ', todo_title: 'Elenco delle cose da fare', todo_empty: 'Nessuna attività in sospeso',
  // 提醒相关
  remind: 'Promemoria',
  remind_none: 'Nessun promemoria',
  remind_on_time: 'In orario',
  remind_5m: '5 minuti prima',
  remind_15m: '15 minuti prima',
  remind_30m: '30 minuti prima',
  remind_1h: '1 ora prima',
  remind_2h: '2 ore prima',
  remind_1d: '1 giorno prima',
  remind_2d: '2 giorni prima',
  remind_3d: '3 giorni prima',
  remind_1w: '1 settimana prima',
  remind_body: '"{title}" inizierà alle {time} del {date}',
  remind_body_all_day: '"{title}" è un evento di giornata intera il {date}'
});

// 葡萄牙语
LC.defLang('pt', {
  nm: 'Português', ct: 'Personalizar Meu Calendário da Vida', cs: 'Preencha seus dados, zoom para viajar pela sua vida',
  ln: 'Meu Nome', lb: 'Minha Data de Nascimento', ll: 'Espero viver até', uy: 'anos',
  bg: '✦ Inicie Minha Jornada da Vida ✦', am: 'Querido, a idade esperada não pode exceder 120 💗',
  al: 'Querido 💗, pare de brincar~ Você já tem {a}. Por favor, insira uma idade maior que sua idade real.',
  zh: 'Role para zoom · Mergulhe na sua vida', ov: 'Visão geral', bt: 'Hoje', ex: 'Sair',
  ty: 'Este Ano', tm: 'Este Mês', vl: 'Visão Geral da Vida', vm: 'Visão Mensal', vd: 'Visão Diária',
  et: 'Novo Evento', em: 'Hora', ed: 'Descrição (opcional)', sv: 'Salvar', cn: 'Cancelar',
  dl: 'Excluir', ne: 'Sem eventos', fa: 'Preencha todos os campos obrigatórios', bf: 'Data de nascimento não pode ser futura',
  mo: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  wd: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  tp: { w: 'Trabalho', p: 'Pessoal', h: 'Saúde', s: 'Estudo', i: 'Importante', a: 'Aniversário', b: 'Aniversário', o: 'Outro' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'Seu nome', ph_smart: 'Tente digitar "Jantar amanhã às 19h"',
  allday: 'Dia inteiro', start: 'Início', end: 'Fim', repeat: 'Repetir', location: 'Local', notes: 'Notas',
  rp_n: 'Uma vez', rp_d: 'Diariamente', rp_w: 'Semanalmente', rp_m: 'Mensalmente', rp_y: 'Anualmente',
  sb: 'Detalhes do Evento', sbt: 'Eventos de Dia Inteiro', sbh: '{h}:00', yr: 'Ano', mn: 'Mês', dy: 'Dia',
  confirm_del: 'Não é possível recuperar após exclusão. Confirmar exclusão?', yes: 'Confirmar', no: 'Cancelar',
  edit: 'Editar Evento', del: 'Excluir Evento', confirm_del_recurring: 'Excluir este evento recorrente?',
  del_all: 'Excluir todos os eventos', del_single: 'Excluir apenas este',
  lifeWarn: '⚠️ Eventos a partir do ano {y} não serão exibidos, mas não serão perdidos. Volte para {oldEnd} anos para vê-los novamente.',
  lifeWarnShort: 'Após alterar a expectativa de vida de {old} para {new},\n\nos eventos a partir do ano {year} não serão exibidos.\n\nVolte para {old} anos para restaurá-los.\n\nTem certeza de que deseja continuar?',
  toolbox_title: 'Caixa de Ferramentas', toolbox_export: 'Exportar Eventos', toolbox_import: 'Importar Eventos', toolbox_logout: 'Sair',
  tooltip_export: '🔒 Para privacidade, os eventos são armazenados apenas no seu navegador. Limpar o cache ou trocar de dispositivo os perderá. Exporte regularmente para fazer backup.',
  import_warning_title: '⚠️ A importação substituirá os eventos existentes',
  import_warning_text: 'O arquivo importado substituirá completamente todos os seus eventos atuais. Esta ação é irreversível.',
  import_suggestion: 'Recomenda-se exportar os eventos atuais como backup antes de importar.',
  import_confirm: 'Confirmar Importação', import_cancel: 'Cancelar', import_success: 'Importação bem-sucedida! A página será atualizada',
  import_format_error: 'Formato de arquivo inválido. Selecione um arquivo de backup válido.',
  import_parse_error: 'Falha na análise: ', todo_title: 'Lista de Tarefas', todo_empty: 'Nenhuma tarefa pendente',
  // 提醒相关
  remind: 'Lembrar',
  remind_none: 'Sem lembrete',
  remind_on_time: 'Na hora',
  remind_5m: '5 minutos antes',
  remind_15m: '15 minutos antes',
  remind_30m: '30 minutos antes',
  remind_1h: '1 hora antes',
  remind_2h: '2 horas antes',
  remind_1d: '1 dia antes',
  remind_2d: '2 dias antes',
  remind_3d: '3 dias antes',
  remind_1w: '1 semana antes',
  remind_body: '"{title}" começará às {time} do dia {date}',
  remind_body_all_day: '"{title}" é um evento de dia inteiro em {date}'
});

// 俄语
LC.defLang('ru', {
  nm: 'Русский', ct: 'Настройка моего календаря жизни', cs: 'Заполните информацию, масштабируйте, чтобы путешествовать по жизни',
  ln: 'Моё имя', lb: 'Моя дата рождения', ll: 'Я надеюсь прожить до', uy: 'лет',
  bg: '✦ Начать моё жизненное путешествие ✦', am: 'Дорогой, ожидаемый возраст не может превышать 120 💗',
  al: 'Дорогой 💗, хватит шутить~ Тебе уже {a}. Пожалуйста, введите возраст больше вашего реального возраста.',
  zh: 'Прокрутите для масштабирования · Погрузитесь в свою жизнь', ov: 'Общий вид', bt: 'Сегодня', ex: 'Выйти',
  ty: 'Этот год', tm: 'Этот месяц', vl: 'Обзор жизни', vm: 'Месяц', vd: 'День',
  et: 'Новое событие', em: 'Время', ed: 'Описание (необязательно)', sv: 'Сохранить', cn: 'Отмена',
  dl: 'Удалить', ne: 'Нет событий', fa: 'Пожалуйста, заполните все обязательные поля', bf: 'Дата рождения не может быть в будущем',
  mo: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  wd: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  tp: { w: 'Работа', p: 'Личное', h: 'Здоровье', s: 'Учёба', i: 'Важное', a: 'Годовщина', b: 'День рождения', o: 'Другое' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'Ваше имя', ph_smart: 'Попробуйте ввести "Ужин завтра в 19:00"',
  allday: 'Весь день', start: 'Начало', end: 'Конец', repeat: 'Повтор', location: 'Место', notes: 'Заметки',
  rp_n: 'Однократно', rp_d: 'Ежедневно', rp_w: 'Еженедельно', rp_m: 'Ежемесячно', rp_y: 'Ежегодно',
  sb: 'Детали события', sbt: 'События на весь день', sbh: '{h}:00', yr: 'Год', mn: 'Месяц', dy: 'День',
  confirm_del: 'После удаления невозможно восстановить. Подтвердить удаление?', yes: 'Подтвердить', no: 'Отмена',
  edit: 'Редактировать', del: 'Удалить', confirm_del_recurring: 'Удалить это повторяющееся событие?',
  del_all: 'Удалить все события', del_single: 'Удалить только это',
  lifeWarn: '⚠️ События начиная с {y} года и далее не будут отображаться, но не потеряются. Вернитесь к {oldEnd} годам, чтобы увидеть их снова.',
  lifeWarnShort: 'После изменения продолжительности жизни с {old} на {new},\n\nсобытия начиная с {year} года и далее не будут отображаться.\n\nВернитесь к {old} годам, чтобы восстановить их.\n\nВы уверены, что хотите продолжить?',
  toolbox_title: 'Инструменты', toolbox_export: 'Экспорт событий', toolbox_import: 'Импорт событий', toolbox_logout: 'Выйти',
  tooltip_export: '🔒 Для конфиденциальности события хранятся только в вашем браузере. Очистка кэша или смена устройства приведёт к их потере. Регулярно экспортируйте для резервного копирования.',
  import_warning_title: '⚠️ Импорт перезапишет существующие события',
  import_warning_text: 'Импортированный файл полностью заменит все ваши текущие события. Это действие необратимо.',
  import_suggestion: 'Рекомендуется экспортировать текущие события в качестве резервной копии перед импортом.',
  import_confirm: 'Подтвердить импорт', import_cancel: 'Отмена', import_success: 'Импорт успешен! Страница будет обновлена',
  import_format_error: 'Неверный формат файла. Пожалуйста, выберите действительный файл резервной копии.',
  import_parse_error: 'Ошибка анализа: ', todo_title: 'Список дел', todo_empty: 'Нет незавершённых задач',
  // 提醒相关
  remind: 'Напоминание',
  remind_none: 'Нет напоминания',
  remind_on_time: 'Точно вовремя',
  remind_5m: 'За 5 минут',
  remind_15m: 'За 15 минут',
  remind_30m: 'За 30 минут',
  remind_1h: 'За 1 час',
  remind_2h: 'За 2 часа',
  remind_1d: 'За 1 день',
  remind_2d: 'За 2 дня',
  remind_3d: 'За 3 дня',
  remind_1w: 'За 1 неделю',
  remind_body: '"{title}" начнётся в {time} {date}',
  remind_body_all_day: '"{title}" — это событие на весь день {date}'
});

// 阿拉伯语
LC.defLang('ar', {
  nm: 'العربية', ct: 'تخصيص تقويم حياتي', cs: 'املأ معلوماتك، قم بالتكبير للسفر عبر حياتك',
  ln: 'اسمي', lb: 'تاريخ ميلادي', ll: 'آمل أن أعيش حتى', uy: 'سنة',
  bg: '✦ ابدأ رحلة حياتي ✦', am: 'عزيزي، العمر المتوقع لا يمكن أن يتجاوز 120 💗',
  al: 'عزيزي 💗، توقف عن المزاح~ أنت بالفعل {a}. يرجى إدخال عمر أكبر من عمرك الفعلي.',
  zh: 'مرر للتكبير · انغمس في حياتك', ov: 'نظرة عامة', bt: 'اليوم', ex: 'تسجيل الخروج',
  ty: 'هذا العام', tm: 'هذا الشهر', vl: 'نظرة عامة على الحياة', vm: 'عرض الشهر', vd: 'عرض اليوم',
  et: 'حدث جديد', em: 'الوقت', ed: 'الوصف (اختياري)', sv: 'حفظ', cn: 'إلغاء',
  dl: 'حذف', ne: 'لا توجد أحداث', fa: 'يرجى ملء جميع الحقول المطلوبة', bf: 'تاريخ الميلاد لا يمكن أن يكون في المستقبل',
  mo: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  wd: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  tp: { w: 'عمل', p: 'شخصي', h: 'صحة', s: 'دراسة', i: 'هام', a: 'ذكرى سنوية', b: 'عيد ميلاد', o: 'أخرى' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'اسمك', ph_smart: 'حاول كتابة "عشاء غداً الساعة 7 مساءً"',
  allday: 'طوال اليوم', start: 'بداية', end: 'نهاية', repeat: 'تكرار', location: 'مكان', notes: 'ملاحظات',
  rp_n: 'مرة واحدة', rp_d: 'يومياً', rp_w: 'أسبوعياً', rp_m: 'شهرياً', rp_y: 'سنوياً',
  sb: 'تفاصيل الحدث', sbt: 'أحداث طوال اليوم', sbh: '{h}:00', yr: 'سنة', mn: 'شهر', dy: 'يوم',
  confirm_del: 'لا يمكن الاسترداد بعد الحذف. هل تريد تأكيد الحذف؟', yes: 'تأكيد', no: 'إلغاء',
  edit: 'تعديل الحدث', del: 'حذف الحدث', confirm_del_recurring: 'هل تريد حذف هذا الحدث المتكرر؟',
  del_all: 'حذف جميع الأحداث', del_single: 'حذف هذا فقط',
  lifeWarn: '⚠️ لن تظهر الأحداث من عام {y} فصاعداً، ولكن لن تُفقد. عد إلى {oldEnd} سنة لرؤيتها مرة أخرى.',
  lifeWarnShort: 'بعد تغيير متوسط العمر المتوقع من {old} إلى {new}،\n\nلن تظهر الأحداث من عام {year} فصاعداً.\n\nعد إلى {old} سنة لاستعادتها.\n\nهل أنت متأكد أنك تريد المتابعة؟',
  toolbox_title: 'صندوق الأدوات', toolbox_export: 'تصدير الأحداث', toolbox_import: 'استيراد الأحداث', toolbox_logout: 'تسجيل الخروج',
  tooltip_export: '🔒 للخصوصية، يتم تخزين الأحداث فقط في متصفحك. مسح ذاكرة التخزين المؤقت أو تغيير الجهاز سيؤدي إلى فقدانها. قم بالتصدير بانتظام لعمل نسخة احتياطية.',
  import_warning_title: '⚠️ الاستيراد سيحل محل الأحداث الموجودة',
  import_warning_text: 'ملف الأحداث المستورد سيحل محل جميع أحداثك الحالية بالكامل. هذا الإجراء لا رجعة فيه.',
  import_suggestion: 'يوصى بتصدير الأحداث الحالية كنسخة احتياطية قبل الاستيراد.',
  import_confirm: 'تأكيد الاستيراد', import_cancel: 'إلغاء', import_success: 'تم الاستيراد بنجاح! سيتم تحديث الصفحة',
  import_format_error: 'تنسيق ملف غير صالح. يرجى تحديد ملف نسخ احتياطي صالح.',
  import_parse_error: 'فشل التحليل: ', todo_title: 'قائمة المهام', todo_empty: 'لا توجد مهام معلقة',
  // 提醒相关
  remind: 'تذكير',
  remind_none: 'لا تذكير',
  remind_on_time: 'في الموعد',
  remind_5m: 'قبل 5 دقائق',
  remind_15m: 'قبل 15 دقيقة',
  remind_30m: 'قبل 30 دقيقة',
  remind_1h: 'قبل ساعة',
  remind_2h: 'قبل ساعتين',
  remind_1d: 'قبل يوم',
  remind_2d: 'قبل يومين',
  remind_3d: 'قبل 3 أيام',
  remind_1w: 'قبل أسبوع',
  remind_body: 'سيبدأ "{title}" في {time} بتاريخ {date}',
  remind_body_all_day: '"{title}" هو حدث ليوم كامل في {date}'
});

// 印地语
LC.defLang('hi', {
  nm: 'हिन्दी', ct: 'मेरा जीवन कैलेंडर अनुकूलित करें', cs: 'अपनी जानकारी भरें, अपने जीवन की यात्रा करने के लिए ज़ूम करें',
  ln: 'मेरा नाम', lb: 'मेरी जन्म तिथि', ll: 'मैं जीना चाहता हूँ', uy: 'साल',
  bg: '✦ मेरी जीवन यात्रा शुरू करें ✦', am: 'प्रिय, अपेक्षित आयु 120 से अधिक नहीं हो सकती 💗',
  al: 'प्रिय 💗, मज़ाक करना बंद करो~ आप पहले से ही {a} वर्ष के हैं। कृपया अपनी वास्तविक आयु से अधिक आयु दर्ज करें।',
  zh: 'ज़ूम करने के लिए स्क्रॉल करें · अपने जीवन में गोता लगाएँ', ov: 'अवलोकन', bt: 'आज', ex: 'लॉग आउट',
  ty: 'इस वर्ष', tm: 'इस महीने', vl: 'जीवन अवलोकन', vm: 'माह दृश्य', vd: 'दिन दृश्य',
  et: 'नई घटना', em: 'समय', ed: 'विवरण (वैकल्पिक)', sv: 'सहेजें', cn: 'रद्द करें',
  dl: 'हटाएँ', ne: 'कोई घटना नहीं', fa: 'कृपया सभी आवश्यक फ़ील्ड भरें', bf: 'जन्म तिथि भविष्य में नहीं हो सकती',
  mo: ['जन', 'फ़र', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'],
  wd: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  tp: { w: 'काम', p: 'व्यक्तिगत', h: 'स्वास्थ्य', s: 'अध्ययन', i: 'महत्वपूर्ण', a: 'सालगिरह', b: 'जन्मदिन', o: 'अन्य' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'आपका नाम', ph_smart: '"कल रात 7 बजे रात का खाना" टाइप करने का प्रयास करें',
  allday: 'पूरा दिन', start: 'प्रारंभ', end: 'समाप्त', repeat: 'दोहराएँ', location: 'स्थान', notes: 'नोट्स',
  rp_n: 'एक बार', rp_d: 'दैनिक', rp_w: 'साप्ताहिक', rp_m: 'मासिक', rp_y: 'वार्षिक',
  sb: 'घटना विवरण', sbt: 'पूरे दिन की घटनाएँ', sbh: '{h}:00', yr: 'वर्ष', mn: 'माह', dy: 'दिन',
  confirm_del: 'हटाने के बाद पुनर्प्राप्त नहीं किया जा सकता। हटाने की पुष्टि करें?', yes: 'पुष्टि करें', no: 'रद्द करें',
  edit: 'घटना संपादित करें', del: 'घटना हटाएँ', confirm_del_recurring: 'इस आवर्ती घटना को हटाएँ?',
  del_all: 'सभी घटनाएँ हटाएँ', del_single: 'केवल यह हटाएँ',
  lifeWarn: '⚠️ {y} वर्ष और उसके बाद की घटनाएँ नहीं दिखाई जाएंगी, लेकिन खोई नहीं जाएंगी। उन्हें फिर से देखने के लिए {oldEnd} वर्ष पर वापस जाएँ।',
  lifeWarnShort: 'जीवन प्रत्याशा को {old} से {new} वर्ष में बदलने के बाद,\n\n{year} वर्ष और उसके बाद की घटनाएँ नहीं दिखाई जाएंगी।\n\nउन्हें पुनर्स्थापित करने के लिए {old} वर्ष पर वापस जाएँ।\n\nक्या आप वाक्य जारी रखना चाहते हैं?',
  toolbox_title: 'टूलबॉक्स', toolbox_export: 'घटनाएँ निर्यात करें', toolbox_import: 'घटनाएँ आयात करें', toolbox_logout: 'लॉग आउट',
  tooltip_export: '🔒 गोपनीयता के लिए, घटनाएँ केवल आपके ब्राउज़र में संग्रहीत होती हैं। कैश साफ़ करने या डिवाइस बदलने से वे खो जाएंगी। बैकअप के लिए नियमित रूप से निर्यात करें।',
  import_warning_title: '⚠️ आयात मौजूदा घटनाओं को अधिलेखित कर देगा',
  import_warning_text: 'आयातित घटना फ़ाइल आपकी सभी वर्तमान घटनाओं को पूरी तरह से बदल देगी। यह क्रिया अपरिवर्तनीय है।',
  import_suggestion: 'आयात करने से पहले वर्तमान घटनाओं को बैकअप के रूप में निर्यात करने की सलाह दी जाती है।',
  import_confirm: 'आयात की पुष्टि करें', import_cancel: 'रद्द करें', import_success: 'आयात सफल! पृष्ठ ताज़ा हो जाएगा',
  import_format_error: 'अमान्य फ़ाइल स्वरूप। कृपया एक मान्य बैकअप फ़ाइल चुनें।',
  import_parse_error: 'पार्स विफल: ', todo_title: 'कार्य सूची', todo_empty: 'कोई लंबित कार्य नहीं',
  // 提醒相关
  remind: 'याद दिलाएं',
  remind_none: 'कोई याद दिलाना नहीं',
  remind_on_time: 'सही समय पर',
  remind_5m: '5 मिनट पहले',
  remind_15m: '15 मिनट पहले',
  remind_30m: '30 मिनट पहले',
  remind_1h: '1 घंटा पहले',
  remind_2h: '2 घंटे पहले',
  remind_1d: '1 दिन पहले',
  remind_2d: '2 दिन पहले',
  remind_3d: '3 दिन पहले',
  remind_1w: '1 सप्ताह पहले',
  remind_body: '"{title}" {date} को {time} पर शुरू होगा',
  remind_body_all_day: '"{title}" {date} को पूरे दिन का आयोजन है'
});

// 泰语
LC.defLang('th', {
  nm: 'ไทย', ct: 'ปรับแต่งปฏิทินชีวิตของฉัน', cs: 'กรอกข้อมูลของคุณ ซูมเพื่อเดินทางผ่านชีวิตของคุณ',
  ln: 'ชื่อของฉัน', lb: 'วันเกิดของฉัน', ll: 'ฉันหวังว่าจะมีชีวิตอยู่ถึง', uy: 'ปี',
  bg: '✦ เริ่มการเดินทางในชีวิตของฉัน ✦', am: 'ที่รัก อายุที่คาดหวังต้องไม่เกิน 120 💗',
  al: 'ที่รัก 💗 หยุดล้อเล่น~ คุณอายุ {a} แล้ว กรุณากรอกอายุที่มากกว่าอายุจริงของคุณ',
  zh: 'เลื่อนเพื่อซูม · ดำดิ่งสู่ชีวิตของคุณ', ov: 'ภาพรวม', bt: 'วันนี้', ex: 'ออกจากระบบ',
  ty: 'ปีนี้', tm: 'เดือนนี้', vl: 'ภาพรวมชีวิต', vm: 'มุมมองเดือน', vd: 'มุมมองวัน',
  et: 'กิจกรรมใหม่', em: 'เวลา', ed: 'คำอธิบาย (ไม่บังคับ)', sv: 'บันทึก', cn: 'ยกเลิก',
  dl: 'ลบ', ne: 'ไม่มีกิจกรรม', fa: 'กรุณากรอกข้อมูลในช่องที่จำเป็นทั้งหมด', bf: 'วันเกิดต้องไม่เป็นอนาคต',
  mo: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  wd: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
  tp: { w: 'งาน', p: 'ส่วนตัว', h: 'สุขภาพ', s: 'เรียน', i: 'สำคัญ', a: 'วันครบรอบ', b: 'วันเกิด', o: 'อื่นๆ' },
  ml: '{m} {y}', ym: '{y} {m}', ph_name: 'ชื่อของคุณ', ph_smart: 'ลองพิมพ์ "อาหารเย็นพรุ่งนี้ 19:00 น."',
  allday: 'ทั้งวัน', start: 'เริ่ม', end: 'สิ้นสุด', repeat: 'ทำซ้ำ', location: 'สถานที่', notes: 'หมายเหตุ',
  rp_n: 'ครั้งเดียว', rp_d: 'ทุกวัน', rp_w: 'ทุกสัปดาห์', rp_m: 'ทุกเดือน', rp_y: 'ทุกปี',
  sb: 'รายละเอียดกิจกรรม', sbt: 'กิจกรรมทั้งวัน', sbh: '{h}:00', yr: 'ปี', mn: 'เดือน', dy: 'วัน',
  confirm_del: 'ไม่สามารถกู้คืนได้หลังจากลบ ยืนยันการลบ?', yes: 'ยืนยัน', no: 'ยกเลิก',
  edit: 'แก้ไขกิจกรรม', del: 'ลบกิจกรรม', confirm_del_recurring: 'ลบกิจกรรมที่เกิดขึ้นซ้ำนี้?',
  del_all: 'ลบกิจกรรมทั้งหมด', del_single: 'ลบเฉพาะกิจกรรมนี้',
  lifeWarn: '⚠️ กิจกรรมตั้งแต่ปี {y} เป็นต้นไปจะไม่แสดง แต่จะไม่สูญหาย กลับไปที่ {oldEnd} ปีเพื่อดูอีกครั้ง',
  lifeWarnShort: 'หลังจากเปลี่ยนอายุขัยจาก {old} เป็น {new},\n\nกิจกรรมตั้งแต่ปี {year} เป็นต้นไปจะไม่แสดง\n\nกลับไปที่ {old} ปีเพื่อกู้คืน\n\nคุณแน่ใจหรือไม่ที่จะดำเนินการต่อ?',
  toolbox_title: 'กล่องเครื่องมือ', toolbox_export: 'ส่งออกกิจกรรม', toolbox_import: 'นำเข้ากิจกรรม', toolbox_logout: 'ออกจากระบบ',
  tooltip_export: '🔒 เพื่อความเป็นส่วนตัว กิจกรรมจะถูกเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น การล้างแคชหรือเปลี่ยนอุปกรณ์จะทำให้สูญหาย ส่งออกเป็นประจำเพื่อสำรองข้อมูล',
  import_warning_title: '⚠️ การนำเข้าจะแทนที่กิจกรรมที่มีอยู่',
  import_warning_text: 'ไฟล์กิจกรรมที่นำเข้าจะแทนที่กิจกรรมปัจจุบันทั้งหมดของคุณ การดำเนินการนี้ไม่สามารถย้อนกลับได้',
  import_suggestion: 'แนะนำให้ส่งออกกิจกรรมปัจจุบันเป็นข้อมูลสำรองก่อนนำเข้า',
  import_confirm: 'ยืนยันการนำเข้า', import_cancel: 'ยกเลิก', import_success: 'นำเข้าสำเร็จ! หน้านี้จะรีเฟรช',
  import_format_error: 'รูปแบบไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์สำรองที่ถูกต้อง',
  import_parse_error: 'การวิเคราะห์ล้มเหลว: ', todo_title: 'รายการสิ่งที่ต้องทำ', todo_empty: 'ไม่มีงานค้าง',
  // 提醒相关
  remind: 'เตือน',
  remind_none: 'ไม่ต้องเตือน',
  remind_on_time: 'ตรงเวลา',
  remind_5m: '5 นาทีก่อน',
  remind_15m: '15 นาทีก่อน',
  remind_30m: '30 นาทีก่อน',
  remind_1h: '1 ชั่วโมงก่อน',
  remind_2h: '2 ชั่วโมงก่อน',
  remind_1d: '1 วันก่อน',
  remind_2d: '2 วันก่อน',
  remind_3d: '3 วันก่อน',
  remind_1w: '1 สัปดาห์ก่อน',
  remind_body: '"{title}" จะเริ่มในเวลา {time} วันที่ {date}',
  remind_body_all_day: '"{title}" เป็นกิจกรรมทั้งวันในวันที่ {date}'
});

/* ========= 语言系统 UI ========= */
LC.buildLangSel = function() {
  var sel = document.getElementById('langSel');
  var html = '';
  for (var i = 0; i < LC.langOrder.length; i++) {
    var code = LC.langOrder[i];
    if (LC.D[code]) {
      html += '<option value="' + code + '"' + (code === LC.curLang ? ' selected' : '') + '>' + LC.D[code].nm + '</option>';
    }
  }
  for (var k in LC.D) {
    if (LC.langOrder.indexOf(k) === -1) {
      html += '<option value="' + k + '"' + (k === LC.curLang ? ' selected' : '') + '>' + LC.D[k].nm + '</option>';
    }
  }
  sel.innerHTML = html;
};

document.getElementById('langSel').onchange = function() {
  LC.curLang = this.value;
  localStorage.setItem(LC.LANG_KEY, LC.curLang);
  document.body.classList.toggle('rtl', LC.curLang === 'ar');
  LC.refreshText();
  LC.populateBirthSelects();
};

/* ========= 出生日期下拉框 ========= */
LC.populateBirthSelects = function() {
  var yS = document.getElementById('inBirthY'),
      mS = document.getElementById('inBirthM'),
      dS = document.getElementById('inBirthD');
  var cY = new Date().getFullYear();
  var oldY = yS.value || cY - 25,
      oldM = mS.value || 1,
      oldD = dS.value || 1;

  var yrT = LC.t('yr', 'Y'), mnT = LC.t('mn', 'M'), dyT = LC.t('dy', 'D');
  var yH = '<option value="">' + yrT + '</option>',
      mH = '<option value="">' + mnT + '</option>',
      dH = '<option value="">' + dyT + '</option>';

  for (var i = cY; i >= cY - 120; i--) yH += '<option value="' + i + '">' + i + '</option>';
  for (var i = 1; i <= 12; i++) mH += '<option value="' + i + '">' + i + '</option>';

  var maxDays = (oldY && oldM) ? new Date(oldY, oldM, 0).getDate() : 31;
  for (var i = 1; i <= maxDays; i++) dH += '<option value="' + i + '">' + i + '</option>';

  yS.innerHTML = yH;
  mS.innerHTML = mH;
  dS.innerHTML = dH;

  yS.value = oldY;
  mS.value = oldM;
  dS.value = oldD;

  yS.onchange = function() { LC.populateBirthSelects(); };
  mS.onchange = function() { LC.populateBirthSelects(); };
};

/* ========= 刷新界面文字 ========= */
LC.refreshText = function() {
  try {
    document.title = LC.t('ct', 'Life Calendar');
    document.getElementById('cTitle').textContent = LC.t('ct', 'Life Calendar');
    document.getElementById('cSub').textContent = LC.t('cs', '');
    document.getElementById('lName').textContent = LC.t('ln', 'Name');
    document.getElementById('lBirth').textContent = LC.t('lb', 'Birth Date');
    document.getElementById('lLife').textContent = LC.t('ll', 'I hope I can live to');
    document.getElementById('unitY').textContent = LC.t('uy', 'years');
    document.getElementById('btnGo').textContent = LC.t('bg', 'Start');

    if (window.innerWidth > 768) {
      document.getElementById('zoomHint').textContent = LC.t('zh', 'Scroll to zoom');
    }

    var btnReset = document.getElementById('btnReset');
    if (btnReset) btnReset.textContent = LC.t('ov', 'Overview');

    var btnThisYear = document.getElementById('btnThisYear');
    if (btnThisYear) btnThisYear.textContent = LC.t('ty', 'This Year');

    var btnThisMonth = document.getElementById('btnThisMonth');
    if (btnThisMonth) btnThisMonth.textContent = LC.t('tm', 'This Month');

    var btnToday = document.getElementById('btnToday');
    if (btnToday) btnToday.textContent = LC.t('bt', 'Today');

    document.getElementById('inName').placeholder = LC.t('ph_name', 'Your name');
    document.getElementById('confirmYes').textContent = LC.t('yes', 'Confirm');
    document.getElementById('confirmNo').textContent = LC.t('no', 'Cancel');
    document.getElementById('ctxEdit').textContent = LC.t('edit', 'Edit');
    document.getElementById('ctxDel').textContent = LC.t('del', 'Delete');

    var todoTitle = document.getElementById('todoTitle');
    if (todoTitle && LC.currentSidebarDate) {
      todoTitle.innerHTML = '📋 ' + LC.t('todo_title', '待办日程');
      LC.renderTodoList(LC.currentSidebarDate);
    }

    if (LC.currentSidebarDate) {
      LC.openSidebar(LC.currentSidebarDate);
    }

    LC.validateAge();
    LC.closeModal();
  } catch (e) { console.warn('refreshText error:', e); }
};
