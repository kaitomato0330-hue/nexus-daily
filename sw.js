const C='nexus-v1',F=['./','./index.html','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('message',e=>{const d=e.data||{};if(d.type==='notify')self.registration.showNotification(d.title,{body:d.body||'',icon:'icon.svg',badge:'icon.svg',vibrate:[300,120,300,120,600],tag:d.tag||undefined,requireInteraction:!!d.sticky})});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
