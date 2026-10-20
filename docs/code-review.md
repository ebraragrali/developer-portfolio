# Kod incelemesi — 20 Ekim 2026

Kapsam: React + TypeScript + Vite portfolyosu. Tasarım, metinler, robot görseli, kablolar, zarf stilleri ve oyun fiziği korunarak yalnızca sınırlı bakım düzeltmeleri yapıldı. Commit veya push yapılmadı.

## Bulgular — önem sırasıyla

### 1. P1 — Başlatıcının render sırasında ref okuması

**Yer:** `src/components/PacmanLauncher.tsx`, portalın başlangıç stili.

Başlangıç konumu `origin.current` üzerinden JSX içinde okunuyordu. `npm run lint`, React hooks/refs kuralından 5 hata veriyordu. Ref değişikliği React'e render bildirimi yapmadığı için görsel konumu belirleyen verinin bu şekilde kullanılması kırılgandı.

**Düzeltildi:** Render için gereken başlangıç geometrisi `launchOrigin` state'ine alındı. Animasyonun kareleri başlangıç anında yakalanan yerel `source` üzerinden hesaplanıyor. Her karede state yazılmıyor. Başlatma boyutu tarayıcıda yaklaşık 40 CSS piksel ölçüldü; portal ve oyuna devir kontrol edildi.

### 2. P2 — Oyun dururken sürekli animasyon döngüsü

**Yer:** `src/components/PageGame.tsx`, `animate` ve `play`.

`requestAnimationFrame`, oyun aktif olmasa da her karede yeniden çağrılıyordu. Aynı yerel Edge oturumunda dururken bir saniyede yaklaşık 145 callback ölçüldü. Bu sayı ekran/çalışma ortamına bağlıdır; FPS performans puanı değildir.

**Düzeltildi:** Döngü yalnızca oyun çalışırken yeni kare istiyor. `play`, tek bir bekleyen kare olmasını sağlayan `wakeAnimation` üzerinden döngüyü uyandırıyor; devam ederken zaman tabanı sıfırlanıyor. Duraklatma sonrası ölçüm 0 callback/s oldu. Başlatma, duraklatma, devam ve sıfırlama tarayıcıda doğrulandı.

### 3. P2 — Effect bağımlılığı ve yön haritasının yanıltıcı tipi

**Yer:** `src/components/PageGame.tsx`, `src/components/gamePhysics.ts`, `tsconfig.*.json`.

Ana effect, render içinde tanımlanan `requestPlay` fonksiyonunu kullanıyor ancak bağımlılıklarına almıyordu. Lint bir `exhaustive-deps` uyarısı veriyordu. Yön haritası ise `Record<string, ...>` ile her olası string anahtarının bir yön içerdiğini iddia ediyordu. TypeScript strict modu da açık değildi.

**Düzeltildi:** `pause`, `play`, `requestPlay` kararlı `useCallback` fonksiyonları oldu ve effect bağımlılıkları tamamlandı. Yön haritası salt okunur, eksik anahtarları mümkün kılan `Partial<Record<...>>` tipiyle ifade edildi; giriş noktasında yönün varlığı kontrol ediliyor. Hem uygulama hem Vite yapılandırması için `strict: true` açıldı. Derleme ve lint geçti.

### 4. P2 — Kullanılmayan toplama sistemi ve eski callback'ler

**Yer:** `src/components/PageGame.tsx`, `src/components/PacmanLauncher.tsx`.

Sarı kenar nesneleri daha önce kaldırılmış olmasına rağmen `Token`, boş `tokens`, `collected`, `items`, bunların state güncellemeleri ve her karede çalışan çarpışma dalı kalmıştı. Başlatıcıdaki `surface` ref'i yalnızca DOM'a atanıyor, başka yerde okunmuyordu. `onExcited` callback'ini sağlayan hiçbir çağıran yoktu; sabit robotta etkisi yoktu.

**Düzeltildi:** Bu ölü akış, import ve callback kaldırıldı. Skor mevcut harf/noktalama hedeflerinden hesaplanmaya devam ediyor. `touches` saf yardımcısı yalnızca eski testlerde kaldığından çalışma zamanı için kullanılmayan envanterde ayrıca belirtildi.

### 5. P2 — Yön düğmelerinin klavye desteği eksik

**Yer:** `src/components/PageGame.tsx`, dokunmatik yön düğmeleri.

Yön düğmeleri `pointerdown` ile çalışıyor, yerel düğme klavye aktivasyonunda aynı işi yapmıyordu. Pointer capture beklenmedik kaybolduğunda yön anahtarını temizleyen özel işleyici de yoktu. WASD desteği vardı; ancak bu, odaklanabilir düğmenin Enter/Space davranışını tamamlamıyordu.

**Düzeltildi:** Klavye kaynaklı click (`detail === 0`) son yönü seçip oyunu başlatabiliyor. Kaybedilen pointer capture anahtarı temizliyor. Dokunmatik kontrol ve oyun hareket mantığı korundu. Masanın Türkçe erişilebilir açıklamasındaki eski “devre kartı” ifadesi, mevcut çizime uygun “kablo” olarak düzeltildi; görünür metin değiştirilmedi.

### 6. P2 — CSS kaskadı ve büyük bileşenlerde bakım borcu

**Yer:** `src/App.css`, `Home.css`, `RobotExperience.css`, `WelcomeLayout.css`, `LayoutRefinements.css`, `PortfolioSections.tsx`, `PageGame.tsx`.

Aynı seçiciler ve breakpoint'ler birçok dosyada tekrar tanımlanıyor. Özellikle `.reference-home.hero`, `.hero-copy`, `.standing-mascot`, `.robot-bubble`, `.site-header` ve mobil kurallar import sırasına bağımlı. Eski zarf için `.contact-letter`, `.letter-signature`, `.envelope-fold` seçicileri mevcut JSX'te kullanılmıyor. `PortfolioSections` uzun tek satırlı JSX ile içerik üretimi, başlıklar ve iframe desteğini bir arada tutuyor. `PageGame` giriş, kamera, skor, DOM hedefleri ve yaşam döngüsünü tek effect'te topluyor.

**Bu incelemede korunuyor:** Kaskadı topluca yeniden düzenlemek piksel farklarına ve mobil gerilemelere yol açabilir. Kullanıcının mevcut görünümü koruma isteği nedeniyle bütün CSS'i birleştirmek veya bileşenleri baştan yazmak gerekçelendirilmedi. Yeni özelliklerde küçük, ayrı bir değişiklikle ve görsel karşılaştırmayla ele alınmalı.

Ek tekrarlar: dış bağlantıların `target/rel` özellikleri App, ContactLetter ve PortfolioSections içinde; testlerde TypeScript dönüştürme/bootstrap kodu birden fazla dosyada bulunuyor. Bu ölçekte basit tekrarlar çalışıyor; sırf satır sayısını azaltmak için yeni soyutlama eklenmedi.

### 7. P2 — Robot görselinin indirme maliyeti

**Yer:** `src/assets/pink-heart-robot-3d.png`.

Aktif PNG yaklaşık 1.07 MB, ekranda ise yaklaşık 125–150 CSS piksel genişlikte. Bu, özellikle mobil ilk indirme maliyetini artırıyor. Diğer eski PNG'ler import edilmediğinden Vite üretim paketine otomatik girmiyor; esas ek maliyet Git deposunda.

**Bu incelemede korunuyor:** PNG'nin görünümü ve şeffaf kenarları değiştirilmedi. İleride alfa kanalı korunmuş lossless WebP veya uygun boyutlu varyant, görsel karşılaştırma sonrası değerlendirilebilir. Bu incelemede yeni bağımlılık eklenmedi.

### 8. P2 — İsteğe bağlı iframe'in güven sınırı

**Yer:** `src/components/PortfolioSections.tsx`; kullanılmayan `GameView.tsx` içinde de aynı izinler var.

`sandbox="allow-scripts allow-same-origin allow-pointer-lock"` aynı kökende çalışan güvenilmeyen içerik için güçlü bir yalıtım değildir. Mevcut yapılandırmada `games[0].src` null olduğundan iframe render edilmiyor; bu aktif bir istismar bulgusu değildir.

**Belgelendi:** İleride güvenilmeyen oyun yüklemek için ayrı köken ve daha dar izinler gereklidir. Mevcut oyun mekaniklerini etkileyebilecek iframe izin değişikliği yapılmadı.

### 9. P3 — README güncel uygulamayı anlatmıyordu

Eski metin mint saçlı/kulaklıklı karakter, sarı nesneler, imza ve önceki tasarım aşamalarından söz ediyordu. Güncel kodla çelişen doğrulama notları içeriyordu.

**Düzeltildi:** README, kurulum (`npm ci`), gerçek dosya yapısı, içerik güncelleme, aktif robot, olay sözleşmesi, ref/state ayrımı, CSS sırası, test kapsamı, güvenlik sınırları ve Vercel ayarlarıyla yeniden yazıldı. `npm test` komutu eklendi. Tarihsel `docs/content-verification.md`, güncel HTTP doğrulaması yerine tarihli bir içerik notu olarak tutuldu.

## Çalışma zamanı dışında kalan dosya ve fonksiyonlar

Envanter, `src/main.tsx` üzerinden import edilen uygulama ağacı, CSS/JSX başvuruları ve yardımcı betikler incelenerek çıkarıldı. “Uygulama kullanmıyor” ifadesi “dosyanın tarihsel veya geliştirme amaçlı değeri yok” anlamına gelmez. Bu dosyalar otomatik olarak silinmedi.

| Öğe | Durum |
| --- | --- |
| `src/components/GameView.tsx` | Hiçbir aktif bileşenden import edilmeyen eski Circuit Break oyunu |
| `greetingTimeline.ts` içindeki `dialogueFrame` | Güncel uygulama çağırmıyor; iki test ve eski karşılama mantığı için kalmış |
| `gamePhysics.ts` içindeki `touches` | Sarı nesneler kaldırıldıktan sonra yalnızca eski çarpışma testi kullanıyor |
| `copy.*.footer`, `phaser`, `instructions`, `score`, `done`, `restart` | Güncel görünümde kullanılmayan/eski GameView için kalan metinler |
| `src/assets/mascot/*` ve `src/assets/mascot-v2/*` | Önceki robotlar ve kaynak notları; sprite betiğinin tarihsel çıktıları |
| `src/assets/pacman/ghost-*.png` | Sprite çıkarma betiği üretiyor; sayfa oyunu kullanmıyor |
| `src/assets/flower-fairy-console.png` | Eski karakter alternatifi |
| `src/assets/hero.png`, `maskot.png` | Aktif uygulamada referans yok |
| `src/assets/pink-heart-robot.png` | Eski robot sürümü; aktif olan `pink-heart-robot-3d.png` |
| `src/assets/welcome-character.png`, `welcome-character-white-legs.png` | Önceki karşılama karakterleri |
| `src/assets/react.svg`, `vite.svg` | Başlangıç şablonundan kalan kullanılmayan simgeler |
| `public/icons.svg`, `public/favicon.svg` | Güncel index/JSX/CSS referansı bulunmadı; public dosyaları yine de çıktıya kopyalanıyor. Aktif favicon `lab.svg` |
| `scripts/extract-sprites.ps1`, `SpriteExtractor.cs` | Üretim uygulaması kullanmıyor; kaynak görsel işleme yardımcıları |

Çalışma zamanında referansı olmayan PNG'ler toplam yaklaşık 8.78 MB. Bunları ayrı bir kaynak/arşiv dizinine taşımak veya silmek ileride ayrıca yapılabilir. Aktif robot ve Pac-Man dosyaları bu listeye dahil değildir.

## React, performans ve tip güvenliği değerlendirmesi

- Robot statik PNG'dir; kendi interval/rAF döngüsü yok. Konuşma balonunun açılması/kapanması state değiştirir.
- Pac-Man her karede konum state'i yazmaz; canvas ve DOM transform'u kullanır. Skor değişimi PageGame'i render eder, robotun state'ini güncellemez. App'in dil/aktif menü değişimi alt bileşenleri yeniden render edebilir; bu başlı başına bir hata değildir. Rastgele `memo` eklenmedi.
- Geliştirmedeki StrictMode effect setup/cleanup tekrarları normaldir; production render sayısı olarak yorumlanmadı.
- Aktif oyunda harf listesi her karede taranıyor; belge büyürse bölgesel indeks veya satır bazlı filtre düşünülebilir. Şu an algoritmayı değiştirmenin riski nedeniyle korunuyor.
- ResizeObserver, event listener ve rAF cleanup'ları incelendi. Dil değişince oyun effect'i yeniden kurulur. Event isimleri global string'lerdir; daha büyük bir uygulamada merkezi tipli olay sözleşmesi düşünülebilir.
- `CustomEvent` içeriği uygulamanın kendi başlatıcısından gelir; mevcut assertion dış veriyi doğrulamaz. İleride dış mesaj/API bağlanırsa runtime doğrulama eklenmelidir.
- Build strict modda geçti. TS kaynaklarında explicit `any` veya `@ts-ignore` bulunmadı. Test dosyalarının dinamik transpile mekanizması, ayrıca test dosyalarına TypeScript tip denetimi yapmaz.

## Mobil ve erişilebilirlik kontrolü

Yerel Edge/Chromium, 900 piksel viewport yüksekliği, 320 / 375 / 768 / 1280 piksel genişlik:

- Belge genişliği viewport genişliğine eşit; yatay taşma bulunmadı.
- Eksik hash bağlantısı hedefi, yüklenmeyen img veya isimsiz button bulunmadı.
- Mobil menü açılıyor, bir bölüm seçildiğinde kapanıyor.
- TR/EN değişimi `html lang` ve metinlere yansıyor.
- Pac-Man başlatma → portal → 40px boyutta devir → hareket → Escape → devam → sıfırlama doğrulandı.
- Dokunmatik yön düğmesinin Enter ile etkinleştirilmesi ve noktalama işaretinin yenmesi doğrulandı. Escape sonrası metinlerin görünür olduğu kontrol edildi.
- Chromium erişilebilirlik ağacında ana başlıklar ve tam isim okunabilir adlar taşıyor. Per-character görsel span'ler ekran okuyucuya tek tek sunulmuyor.

**Sınırlar:** Bu kontroller tam bir WCAG/axe denetimi veya NVDA/VoiceOver testi değildir. Safari/Firefox ve gerçek telefon testleri yapılmadı. Oyun kontrol alanı dar ekranda yer kaplayabilir; canlı skorun sık duyurulması ve oyun başlamadan yön tuşlarının sayfa kaydırma yerine oyunu tetiklemesi ileride kullanıcı testiyle değerlendirilmeli. Reduced-motion desteği CSS ve başlatıcıda mevcut; aktif oyun elle başlatılır.

## Bağlantı kontrolü

Canlı HTTP kontrolü, 20 Ekim 2026:

| Hedef | Sonuç |
| --- | --- |
| `https://github.com/ebraragrali` | HTTP 200 |
| `https://github.com/ebraragrali/database_school_management_project` | HTTP 200 |
| `https://github.com/ebraragrali/real-vs-ai-faces` | HTTP 200 |
| `https://github.com/ebraragrali/YZTA-Bootcamp` | HTTP 200 |
| `https://github.com/ebraragrali/teknofest-model-uydu-gui-2025` | HTTP 200 |
| `https://www.linkedin.com/in/ebraragrali` | Otomatik isteğe HTTP 999; gerçek profil erişimi doğrulanamadı. Bu sonuç 404 kanıtı değildir |
| `mailto:ebraragrali1@gmail.com` | Adres ve URI biçimi kontrol edildi; posta gönderilmedi, teslim edilebilirlik test edilmedi |
| Bölüm ve masa hash bağlantıları | DOM hedefleri mevcut; mobil gezinme etkileşimi geçti |

Dış bağlantıların `noopener noreferrer` nitelikleri mevcut. GitHub HTTP 200 sonucu projenin erişilebilir olduğunu gösterir; her repo açıklamasının içeriğe uygunluğu bu incelemede yeniden CV doğrulaması olarak ele alınmadı.

## Bağımlılıklar ve güvenlik

- `react` / `react-dom` aktif çalışma zamanı bağımlılıkları. Listelenen geliştirme bağımlılıkları Vite, TypeScript, ESLint yapılandırması veya tipler için kullanılıyor. Kaldırılabilecek açık bir paket tespit edilmedi.
- `npm audit --json`: 0 info / low / moderate / high / critical, toplam 0 bilinen açık. Bu, npm kayıt servisi kontrolünün tarihli sonucudur; güvenlik garantisi değildir.
- Kaynaklarda dinamik `eval`, `dangerouslySetInnerHTML`, dış HTML enjeksiyonu veya istemci API anahtarı akışı bulunmadı.
- Takip edilen dosyalarda `.env`, özel anahtar veya credential dosyası bulunmadı. Tipik GitHub/OpenAI/AWS token ve private-key desenleriyle taramada eşleşen gizli bilgi görülmedi. Bu desen taraması kapsamlı bir sızıntı garantisi değildir.
- `.gitignore` çevre dosyalarını, anahtarları, bağımlılık/derleme ve yerel araç çıktısını dışlıyor. İleride `VITE_*` değişkenlerine sır koyulmamalı.
- Tasarımı ve dosya içeriğini değiştiren paket güncellemesi, `audit fix`, yeni servis bağlantısı veya yeni bağımlılık eklenmedi.

## Doğrulama sonucu

| Kontrol | Sonuç |
| --- | --- |
| `npm run lint` | Başarılı; önceki 5 hata ve 1 uyarı giderildi |
| `npm run build` | Başarılı; strict TypeScript + Vite |
| `npm test` | 18/18 başarılı |
| `npm audit --json` | 0 bilinen açık |
| Tarayıcı etkileşim kontrolleri | Başlatma/devir, duraklatma/devam, sıfırlama, mobil menü, dil, yön düğmesi, noktalama geçti |
| Boşta oyun rAF | Yaklaşık 145 callback/s → 0 callback/s, aynı yerel ölçüm yöntemi |
| Görsel kapsam | CSS, robot PNG, zarf ve kablo çizimleri değiştirilmedi; üretim CSS dosyası hash'i aynı kaldı |
| Git | Yalnızca yerel düzenleme; commit/push yok |

Tarayıcı kontrol betikleri ve ekran görüntüleri yerel, Git dışındaki `tmp/` dizininde tutuluyor. Playwright proje bağımlılığı yapılmadı; bu yerel kontroller için ortamın mevcut tarayıcı araçları kullanıldı.

## Teknik kaynaklar

- [React useRef: ref okuma/yazmayı render dışında tutma](https://react.dev/reference/react/useRef)
- [React useEffect: bağımlılıklar ve cleanup](https://react.dev/reference/react/useEffect)
- [npm audit: kayıt servisi güvenlik denetimi](https://docs.npmjs.com/cli/v11/commands/npm-audit/)
- [WHATWG HTML: iframe sandbox izinleri](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox)
- [Vite: istemciye açılan environment değişkenleri](https://vite.dev/guide/env-and-mode)
- [Vercel: Vite proje kurulumu](https://vercel.com/docs/frameworks/frontend/vite)

Bu kaynaklar uygulama kararlarının gerekçesini destekler; bu rapordaki proje bulguları yerel kod ve komut çıktılarından elde edilmiştir.