function submitVolunteer(){
  var g=function(id){return (document.getElementById(id).value||'').trim();};
  var name=g('vfName'), email=g('vfEmail'), city=g('vfCity'), msg=g('vfMsg');
  var help=document.getElementById('vfHelp').value;
  var note=document.getElementById('vfNote');
  if(!name||!email){ note.innerHTML='Please add your name and email, then try again. Or email us directly at <a href="mailto:info@cocotax.org">info@cocotax.org</a>.'; return; }
  var subject='Transit Tax volunteer signup: '+name;
  var body='Name: '+name+'\nEmail: '+email+'\nCity: '+city+'\nHow they want to help: '+help+'\n\nMessage:\n'+msg;
  window.location.href='mailto:info@cocotax.org?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  note.innerHTML='Thanks, '+name.replace(/[<>]/g,'')+'! Your email app should open with your signup ready to send. If it does not, email us at <a href="mailto:info@cocotax.org">info@cocotax.org</a>.';
}

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }
  ready(function () {
    // Navigation toggle
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (btn && nav) {
      function close() {
        nav.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = nav.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) { close(); }
      });
      document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !btn.contains(e.target)) { close(); }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(); }
      });
    }

    // City Tax Calculator (Homepage only)
    var sel = document.getElementById('citySelect');
    if (!sel) return;

    var TAX=[
      {c:"Alameda",k:"Alameda",cur:10.750,aft:11.250},
      {c:"Albany",k:"Alameda",cur:10.750,aft:11.250},
      {c:"Antioch",k:"Contra Costa",cur:9.750,aft:10.250},
      {c:"Atherton",k:"San Mateo",cur:9.375,aft:9.875},
      {c:"Belmont",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"Berkeley",k:"Alameda",cur:10.250,aft:10.750},
      {c:"Brentwood",k:"Contra Costa",cur:8.750,aft:9.250},
      {c:"Brisbane",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"Burlingame",k:"San Mateo",cur:9.625,aft:10.125},
      {c:"Campbell",k:"Santa Clara",cur:10.500,aft:11.000},
      {c:"Clayton",k:"Contra Costa",cur:8.750,aft:9.250},
      {c:"Colma",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"Concord",k:"Contra Costa",cur:9.750,aft:10.250},
      {c:"Cupertino",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Daly City",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"Danville",k:"Contra Costa",cur:8.750,aft:9.250},
      {c:"Dublin",k:"Alameda",cur:10.250,aft:10.750},
      {c:"East Palo Alto",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"El Cerrito",k:"Contra Costa",cur:10.250,aft:10.750},
      {c:"Emeryville",k:"Alameda",cur:10.500,aft:11.000},
      {c:"Foster City",k:"San Mateo",cur:9.375,aft:9.875},
      {c:"Fremont",k:"Alameda",cur:10.250,aft:10.750},
      {c:"Gilroy",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Half Moon Bay",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"Hayward",k:"Alameda",cur:10.750,aft:11.250},
      {c:"Hercules",k:"Contra Costa",cur:9.250,aft:9.750},
      {c:"Hillsborough",k:"San Mateo",cur:9.375,aft:9.875},
      {c:"Lafayette",k:"Contra Costa",cur:9.250,aft:9.750},
      {c:"Livermore",k:"Alameda",cur:10.250,aft:10.750},
      {c:"Los Altos",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Los Altos Hills",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Los Gatos",k:"Santa Clara",cur:9.875,aft:10.375},
      {c:"Martinez",k:"Contra Costa",cur:9.750,aft:10.250},
      {c:"Menlo Park",k:"San Mateo",cur:9.375,aft:9.875},
      {c:"Millbrae",k:"San Mateo",cur:9.375,aft:9.875},
      {c:"Milpitas",k:"Santa Clara",cur:10.000,aft:10.500},
      {c:"Monte Sereno",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Moraga",k:"Contra Costa",cur:9.750,aft:10.250},
      {c:"Morgan Hill",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Mountain View",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Newark",k:"Alameda",cur:10.750,aft:11.250},
      {c:"Oakland",k:"Alameda",cur:10.750,aft:11.250},
      {c:"Oakley",k:"Contra Costa",cur:8.750,aft:9.250},
      {c:"Orinda",k:"Contra Costa",cur:9.750,aft:10.250},
      {c:"Pacifica",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"Palo Alto",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Piedmont",k:"Alameda",cur:10.250,aft:10.750},
      {c:"Pinole",k:"Contra Costa",cur:10.250,aft:10.750},
      {c:"Pittsburg",k:"Contra Costa",cur:9.250,aft:9.750},
      {c:"Pleasant Hill",k:"Contra Costa",cur:9.250,aft:9.750},
      {c:"Pleasanton",k:"Alameda",cur:10.250,aft:10.750},
      {c:"Portola Valley",k:"San Mateo",cur:9.375,aft:9.875},
      {c:"Redwood City",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"Richmond",k:"Contra Costa",cur:9.750,aft:10.250},
      {c:"San Bruno",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"San Carlos",k:"San Mateo",cur:9.375,aft:9.875},
      {c:"San Francisco",k:"San Francisco",cur:8.625,aft:9.625},
      {c:"San Jose",k:"Santa Clara",cur:10.000,aft:10.500},
      {c:"San Leandro",k:"Alameda",cur:10.750,aft:11.250},
      {c:"San Mateo",k:"San Mateo",cur:9.625,aft:10.125},
      {c:"San Pablo",k:"Contra Costa",cur:9.500,aft:10.000},
      {c:"San Ramon",k:"Contra Costa",cur:9.750,aft:10.250},
      {c:"Santa Clara",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Saratoga",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"South San Francisco",k:"San Mateo",cur:9.875,aft:10.375},
      {c:"Sunnyvale",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Unincorporated Alameda County",k:"Alameda",cur:10.250,aft:10.750},
      {c:"Unincorporated Contra Costa County",k:"Contra Costa",cur:8.750,aft:9.250},
      {c:"Unincorporated San Mateo County",k:"San Mateo",cur:9.375,aft:9.875},
      {c:"Unincorporated Santa Clara County",k:"Santa Clara",cur:9.750,aft:10.250},
      {c:"Union City",k:"Alameda",cur:10.750,aft:11.250},
      {c:"Walnut Creek",k:"Contra Costa",cur:9.250,aft:9.750},
      {c:"Woodside",k:"San Mateo",cur:9.375,aft:9.875}
    ];

    var cur=document.getElementById('curRate'), aft=document.getElementById('aftRate'), note=document.getElementById('placeNote');
    function fmt(v){return v.toFixed(3)+'%';}

    TAX.slice().sort(function(a,b){return a.c.localeCompare(b.c);}).forEach(function(r){
      var o=document.createElement('option'); o.value=r.c; o.textContent=r.c+'  ('+r.k+')'; sel.appendChild(o);
    });

    function update(){
      var rec=TAX.filter(function(r){return r.c===sel.value;})[0];
      if(!rec){ cur.innerHTML=aft.innerHTML='&mdash;'; note.textContent='Pick a location to see the comparison.'; return; }
      cur.textContent=fmt(rec.cur); aft.textContent=fmt(rec.aft);
      var deltaPts=rec.aft-rec.cur;
      note.innerHTML='<strong>'+rec.c+'</strong> ('+rec.k+' County): today '+fmt(rec.cur)+', and '+fmt(rec.aft)+' if the transit tax passes, an increase of '+deltaPts.toFixed(3)+' points.';
    }
    sel.addEventListener('change', update);
  });
})();
