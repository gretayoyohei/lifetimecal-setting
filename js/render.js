/* ========= 背景动画（修复：使用画布实际尺寸绘制，确保全屏） ========= */
LC.animBg=function(time){
  if(!LC.showBgAnim)return;
  var t2=time*.001;
  // 获取画布逻辑尺寸（设备独立像素）
  var w = LC.W, h = LC.H;
  if (w === 0 || h === 0) {
    requestAnimationFrame(LC.animBg);
    return;
  }
  // 重置变换矩阵：将逻辑坐标映射到物理像素
  LC.bgCtx.setTransform(LC.dpr,0,0,LC.dpr,0,0);
  // 清除并填充背景色
  LC.bgCtx.clearRect(0,0,w,h);
  LC.bgCtx.fillStyle='#f5f0e8';
  LC.bgCtx.fillRect(0,0,w,h);
  // 绘制网格线
  LC.bgCtx.strokeStyle='rgba(200,190,175,0.22)';
  LC.bgCtx.lineWidth=.5;
  for(var x=0;x<w;x+=18){
    LC.bgCtx.beginPath();
    LC.bgCtx.moveTo(x,0);
    LC.bgCtx.lineTo(x,h);
    LC.bgCtx.stroke();
  }
  for(var y=0;y<h;y+=18){
    LC.bgCtx.beginPath();
    LC.bgCtx.moveTo(0,y);
    LC.bgCtx.lineTo(w,y);
    LC.bgCtx.stroke();
  }
  requestAnimationFrame(LC.animBg);
};

/* ========= 日历渲染 ========= */
LC.render=function(){
  if (!LC.ctx) return;
  LC.dayEventRects = [];
  LC.ctx.setTransform(LC.dpr,0,0,LC.dpr,0,0);
  LC.ctx.clearRect(0,0,LC.W,LC.H);
  // 优化文本和图形渲染清晰度
  LC.ctx.imageSmoothingEnabled = true;
  LC.ctx.textRendering = 'geometricPrecision';
  LC.drawCalBg();
  LC.drawGrid();
};

LC.drawCalBg=function(){
  var t2=LC.clamp((LC.zoom-.3)/40,0,1);
  var r2=Math.round(LC.lerp(245,252,t2)),g=Math.round(LC.lerp(240,248,t2)),b=Math.round(LC.lerp(232,240,t2));
  LC.ctx.fillStyle='rgb('+r2+','+g+','+b+')';LC.ctx.fillRect(0,0,LC.W,LC.H);
  LC.ctx.strokeStyle='rgba(200,190,175,0.18)';LC.ctx.lineWidth=.5;
  for(var x=0;x<LC.W;x+=18){LC.ctx.beginPath();LC.ctx.moveTo(x,0);LC.ctx.lineTo(x,LC.H);LC.ctx.stroke()}
  for(var y=0;y<LC.H;y+=18){LC.ctx.beginPath();LC.ctx.moveTo(0,y);LC.ctx.lineTo(LC.W,y);LC.ctx.stroke()}
};

LC.drawGrid=function(){
  if(!LC.ud)return;
  var tl=LC.s2w(0,0),br=LC.s2w(LC.W,LC.H);
  var c0=Math.max(0,Math.floor(tl.x/(LC.YW+LC.YGAP))-1);
  var c1=Math.min(LC.YPR-1,Math.ceil(br.x/(LC.YW+LC.YGAP))+1);
  var r0=Math.max(0,Math.floor(tl.y/(LC.YH+LC.YGAP))-1);
  var r1_=Math.ceil(LC.totalYrs/LC.YPR)-1;
  var r1=Math.min(r1_,Math.ceil(br.y/(LC.YH+LC.YGAP))+1);
  var yA=LC.fadeO(LC.zoom,LC.ZY_HIDE_S,LC.ZY_HIDE_E);
  var mA=LC.fadeI(LC.zoom,LC.ZM_SHOW,LC.ZM_FULL);
  var mlA=LC.fadeO(LC.zoom,LC.ZMO_HIDE_S,LC.ZMO_HIDE_E);
  var ymA=LC.fadeI(LC.zoom,LC.ZYM_S,LC.ZYM_E);
  var dA=LC.fadeI(LC.zoom,LC.ZD_SHOW,LC.ZD_FULL);
  for(var row=r0;row<=r1;row++){for(var col=c0;col<=c1;col++){var i=row*LC.YPR+col;if(i>=LC.totalYrs)continue;LC.drawYear(LC.birthYr+i,LC.yrPos(i),yA,mA,mlA,ymA,dA)}}
};

LC.drawYear=function(year,wp,yA,mA,mlA,ymA,dA){
  var s=LC.w2s(wp.x,wp.y);var sw=LC.YW*LC.zoom,sh=LC.YH*LC.zoom;if(sw<1)return;
  var now=new Date(),isPast=year<now.getFullYear(),isCur=year===now.getFullYear();
  var rad=Math.max(1,Math.min(14,sw*.035));
  LC.ctx.save();
  LC.rRect(s.x,s.y,sw,sh,rad);
  LC.ctx.fillStyle=isCur?'#fff8ec':isPast?'#f0ece4':'#fefcf7';LC.ctx.fill();
  LC.ctx.strokeStyle=isCur?'#e8b878':isPast?'#ddd4c4':'#d8ccb8';LC.ctx.lineWidth=isCur?2.5:1.5;LC.ctx.stroke();
  if(isCur){LC.ctx.shadowColor='rgba(220,160,80,0.4)';LC.ctx.shadowBlur=Math.min(20,sw*.05);LC.rRect(s.x,s.y,sw,sh,rad);LC.ctx.stroke();LC.ctx.shadowBlur=0}
  if(isPast&&sw>8){LC.ctx.save();LC.rRect(s.x,s.y,sw,sh,rad);LC.ctx.clip();LC.ctx.strokeStyle='rgba(170,155,135,0.08)';LC.ctx.lineWidth=1;var st2=Math.max(4,sw/18);for(var k=-sh;k<sw+sh;k+=st2){LC.ctx.beginPath();LC.ctx.moveTo(s.x+k,s.y);LC.ctx.lineTo(s.x+k-sh,s.y+sh);LC.ctx.stroke()}LC.ctx.restore()}
  if(yA>0.01&&sw>12){LC.ctx.globalAlpha=yA;var fs=Math.max(7,Math.min(44,sw*.14));LC.ctx.font='700 '+fs+'px "Playpen Sans","Zen Maru Gothic","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';LC.ctx.fillStyle=isCur?'#d4956b':isPast?'#b0a090':'#4a3728';LC.ctx.textAlign='center';LC.ctx.textBaseline='middle';LC.ctx.fillText(String(year),s.x+sw/2,s.y+sh/2);LC.ctx.globalAlpha=1}
  if(yA>.4&&sw>18&&sw<100){var hasEv=LC.ud.events&&LC.ud.events.some(function(e){return year>=parseInt(e.startDate.substr(0,4))&&year<=parseInt(e.endDate.substr(0,4))});if(hasEv){LC.ctx.fillStyle='#d4956b';LC.ctx.globalAlpha=yA*.5;LC.ctx.beginPath();LC.ctx.arc(s.x+sw-7,s.y+7,Math.max(2,sw*.02),0,Math.PI*2);LC.ctx.fill();LC.ctx.globalAlpha=1}}
  if(mA>0.01){LC.ctx.globalAlpha=mA;for(var m=0;m<12;m++){var mp=LC.moPos(m);var ms=LC.w2s(wp.x+mp.x,wp.y+mp.y);var msw=LC.MW*LC.zoom,msh=LC.MH*LC.zoom;if(msw<2)continue;LC.drawMonth(year,m,ms.x,ms.y,msw,msh,mlA,ymA,dA)}LC.ctx.globalAlpha=1}
  LC.ctx.restore();
};

LC.drawMonth=function(year,m,sx,sy,sw,sh,mlA,ymA,dA){
  var mStr=String(m+1).padStart(2,'0');
  var isPast=LC.fmtDate(year,m+1,1)<LC.TODAY;
  var isCur=LC.TODAY.startsWith(year+'-'+mStr);
  var rad=Math.max(1,Math.min(8,sw*.05));
  LC.rRect(sx,sy,sw,sh,rad);
  LC.ctx.fillStyle=isCur?'#fff8ec':isPast?'#f2ede5':'#fef9f0';LC.ctx.fill();
  LC.ctx.strokeStyle=isCur?'#e0b070':isPast?'#ddd4c4':'#e0d4c0';LC.ctx.lineWidth=isCur?2:1;LC.ctx.stroke();
  if(isCur&&sw>10){LC.ctx.shadowColor='rgba(220,160,80,0.35)';LC.ctx.shadowBlur=Math.min(10,sw*.03);LC.rRect(sx,sy,sw,sh,rad);LC.ctx.stroke();LC.ctx.shadowBlur=0}
  var mo=LC.t('mo',['1','2','3','4','5','6','7','8','9','10','11','12']);
  var wd=LC.t('wd',['Su','Mo','Tu','We','Th','Fr','Sa']);
  if(mlA>0.01&&sw>8){LC.ctx.save();LC.ctx.globalAlpha=mlA;var fs=Math.max(5,Math.min(22,sw*.18));LC.ctx.font='600 '+fs+'px "Playpen Sans","Zen Maru Gothic","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';LC.ctx.fillStyle=isCur?'#d4956b':isPast?'#b0a090':'#8b7d6b';LC.ctx.textAlign='center';LC.ctx.textBaseline='middle';var label=LC.tf('ml',{y:year,m:mo[m]},year+' '+mo[m]);LC.ctx.fillText(label,sx+sw/2,sy+sh/2);LC.ctx.restore()}
  if(ymA>0.01&&sw>20){LC.ctx.save();LC.ctx.globalAlpha=ymA;var hfs=Math.max(10, Math.min(22, sw*.045));LC.ctx.font='600 '+hfs+'px "Playpen Sans","Zen Maru Gothic","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';LC.ctx.fillStyle=isCur?'#d4956b':'#8b7d6b';LC.ctx.textAlign='center';LC.ctx.textBaseline='top';var ymLabel=LC.tf('ym',{y:year,m:mo[m]},year+' '+mo[m]);LC.ctx.fillText(ymLabel,sx+sw/2,sy+sh*.02);LC.ctx.restore()}
  if(dA>0.01){LC.ctx.save();LC.ctx.globalAlpha=dA;var mi=LC.monthInfo(year,m);if(sw>35){var wfs=Math.max(7, Math.min(15, sw*.032));LC.ctx.font='400 '+wfs+'px "Playpen Sans","Zen Maru Gothic","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';LC.ctx.fillStyle='#b0a090';LC.ctx.textAlign='center';LC.ctx.textBaseline='top';for(var d=0;d<7;d++){var dp2=LC.dayPos(d,0);LC.ctx.fillText(wd[d],sx+dp2.x*LC.zoom+LC.DW*LC.zoom/2,sy+LC.HDR*.55*LC.zoom)}}
  for(var day=1;day<=mi.days;day++){var dow=(mi.dow1+day-1)%7,wr=Math.floor((mi.dow1+day-1)/7);var dpp=LC.dayPos(dow,wr);var dsx=sx+dpp.x*LC.zoom,dsy=sy+dpp.y*LC.zoom;var dsw=LC.DW*LC.zoom,dsh=LC.DH*LC.zoom;if(dsw<1)continue;LC.drawDay(LC.fmtDate(year,m,day),day,dsx,dsy,dsw,dsh)}LC.ctx.restore()}
};

LC.drawDay=function(ds,day,sx,sy,sw,sh){
  var isPast=ds<LC.TODAY,isToday=ds===LC.TODAY;
  var rad=Math.max(.5,Math.min(4,sw*.1));
  LC.rRect(sx,sy,sw,sh,rad);
  LC.ctx.fillStyle=isToday?'#fff8ec':isPast?'#f0ece4':'#fefcf7';LC.ctx.fill();
  LC.ctx.strokeStyle=isToday?'#e8b878':isPast?'#ddd4c4':'#e8dcc8';LC.ctx.lineWidth=isToday?1.5:.8;LC.ctx.stroke();
  if(isToday&&sw>5){LC.ctx.shadowColor='rgba(220,160,80,0.4)';LC.ctx.shadowBlur=Math.min(8,sw*.1);LC.rRect(sx,sy,sw,sh,rad);LC.ctx.stroke();LC.ctx.shadowBlur=0}

  LC.ctx.save();
  LC.ctx.beginPath();
  LC.ctx.rect(sx, sy, sw, sh);
  LC.ctx.clip();

  var dateY = sy + sh*.02;
  var dateH = 0;
  if(sw>5){
    var fs=Math.max(5, Math.min(22, sw*.32));
    LC.ctx.font='600 '+fs+'px "Playpen Sans","Zen Maru Gothic","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';
    LC.ctx.fillStyle=isToday?'#d4956b':isPast?'#b0a090':'#4a3728';
    LC.ctx.textAlign='left';LC.ctx.textBaseline='top';
    LC.ctx.fillText(day,sx+sw*.06,dateY);
    dateH = fs + 2;
  }

  var evs = LC.getEv(ds).sort(function(a,b){ return (b.isAllDay?1:0)-(a.isAllDay?1:0) || (a.startTime||'').localeCompare(b.startTime||''); });

  if(evs.length){
    if(sw<22){
      LC.ctx.fillStyle=LC.EC[evs[0].type]||LC.EC.o;
      LC.ctx.beginPath();LC.ctx.arc(sx+sw/2,sy+sh*.65,Math.max(1,sw*.06),0,Math.PI*2);LC.ctx.fill();
    } else {
      var efs=Math.max(5,Math.min(14,sw*.09));
      var bhh=efs+6;
      var startY = dateY + dateH + 2;
      var maxE=Math.floor((sh - (startY - sy))/(bhh+2));

      var eventFont = '400 '+efs+'px "Playpen Sans","Zen Maru Gothic","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';

      for(var j=0;j<Math.min(evs.length, maxE);j++){
        var ey=startY+j*(bhh+2);
        var ev=evs[j];
        var c=LC.EC[ev.type]||LC.EC.o;

        LC.ctx.textBaseline = 'middle';
        var textY = ey + bhh/2;

        if(ev.isAllDay){
          LC.rRect(sx+sw*.04,ey,sw*.92,bhh,2);LC.ctx.fillStyle=c+'55';LC.ctx.fill();
          LC.ctx.font = eventFont;
          LC.ctx.fillStyle='#4a3728';LC.ctx.textAlign='left';
          LC.ctx.fillText(ev.title,sx+sw*.1,textY,sw*.82);
        } else {
          LC.ctx.fillStyle=c;LC.ctx.beginPath();
          LC.ctx.arc(sx+sw*.06,textY,Math.max(2,bhh*.3),0,Math.PI*2);LC.ctx.fill();

          LC.ctx.font = eventFont;
          LC.ctx.textAlign='left';LC.ctx.fillStyle='#4a3728';
          var timeW = 0;
          if(ev.startTime) {
            timeW = LC.ctx.measureText(ev.startTime).width + 6;
          }
          var titleMaxW = sw*0.92 - (sw*0.12) - timeW - 4;
          LC.ctx.fillText(ev.title, sx+sw*.12, textY, Math.max(10, titleMaxW));

          if(ev.startTime) {
            LC.ctx.textAlign='right';
            LC.ctx.fillStyle='#8b7d6b';
            LC.ctx.fillText(ev.startTime, sx+sw*.94, textY);
          }
        }

        LC.dayEventRects.push({
          x: sx+sw*.04, y: ey, w: sw*.92, h: bhh,
          ev: ev, ds: ds
        });
      }
    }
  }
  LC.ctx.restore();
};