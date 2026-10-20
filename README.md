Portfolio

React, TypeScript ve Vite ile geliştirilen, Türkçe ve İngilizce kişisel portfolyo. Projeleri, eğitimi, deneyimleri ve sertifikaları bir araya getirir. Etkileşimli çalışma masası, robot karşılama alanı, sayfadaki metinleri yiyen Pac-Man ve açılan iletişim zarfı içerir.

## Yerel geliştirme

Node.js 24 ve npm kullanılması önerilir. Kilitli araçların gereksinimlerini karşılayan Node.js 22.13+ da kullanılabilir. İnceleme Node.js 24.16.0 ve npm 11.13.0 ile yapıldı.

```sh
cd DeveloperPortfolio
npm ci
npm run dev
```

Depoyu doğrudan klonladıysanız önce klonun kök klasörüne girin; ayrıca bir `DeveloperPortfolio` alt klasörü oluşturmanız gerekmez. Terminaldeki yerel adresi açın. Bu proje TSX derlemesi gerektirir; `index.html` dosyasını doğrudan veya Live Server ile açmak yeterli değildir.

```sh
npm run lint       # TypeScript/React lint denetimi
npm test           # Node test runner ile testler
npm run build      # Strict TypeScript kontrolü ve üretim çıktısı
npm run preview    # Üretim çıktısını yerelde görüntüleme
```

`build` çıktısı `dist/` dizinine yazılır. `preview` geliştirme sırasında üretim çıktısını denemek içindir.

## Proje yapısı

| Dosya / dizin | Sorumluluk |
| --- | --- |
| `src/App.tsx` | Dil tercihi, gezinme, aktif bölüm ve ana sayfa bileşimi |
| `src/data/content.ts` | Dil tipi, menü metinleri, iletişim adresleri ve isteğe bağlı oyun URL'si |
| `src/data/portfolio.ts` | Eğitim, projeler, beceriler, deneyimler ve sertifikalar |
| `src/components/PortfolioSections.tsx` | İçerik bölümleri ve proje kartları |
| `src/components/RobotGreeting.tsx` | Sabit robot görseli ve açılıp kapanan karşılama balonu |
| `src/components/Workstation.tsx` | Bölüm bağlantıları içeren SVG masa |
| `src/components/ElectricalCables.tsx` | Dekoratif SVG kablolar |
| `src/components/PacmanLauncher.tsx` | Başlatma düğmesini yeme ve sayfa oyununa geçiş |
| `src/components/PageGame.tsx` | Klavye/dokunmatik giriş, skor, hareket döngüsü ve kamera takibi |
| `src/components/gamePhysics.ts` | Yönler, hız normalizasyonu ve sınırlar için saf fonksiyonlar |
| `src/components/greetingTimeline.ts` | Başlatma animasyonunun zaman ve konum hesapları |
| `src/components/pacmanRenderer.ts` | Canvas üzerinde sprite çizimi |
| `src/components/EdibleText.tsx` | Görsel karakter hedefleri ve erişilebilir tam metin |
| `src/components/ContactLetter.tsx` | Görünür alana yaklaşınca bir kez açılan iletişim zarfı |
| `tests/` | Fizik, animasyon hesapları, sprite çizimi ve TR/EN içerik testleri |
| `scripts/` | Eski kaynak sprite sayfalarını işleyen Windows geliştirme yardımcıları |

## İçerik güncelleme

Kişisel içerikleri `src/data/portfolio.ts`, e-posta ve profil bağlantılarını `src/data/content.ts` üzerinden düzenleyin. Her iki dilin karşılığını birlikte güncelleyin. Proje kartında `repository: null` kullanılırsa kart tıklanabilir bağlantı olarak sunulmaz.

Dil tercihi `localStorage` içindeki `lab-language` anahtarında tutulur. Depolama engellenirse site Türkçe varsayılanıyla çalışmaya devam eder. Backend, iletişim formu, analitik servisi veya API anahtarı gerekmiyor; e-posta bağlantısı kullanıcının posta uygulamasını açar.

Robotun aktif görseli `src/assets/pink-heart-robot-3d.png`; Pac-Man'in aktif görseli `src/assets/pacman/character.png`. Robot şu anda sabit bir PNG'dir; bağımsız kol veya yüz animasyonu çalıştırmaz. `src/assets/` altındaki eski karakter alternatifleri otomatik olarak ekrana yüklenmez. Kullanılmayan dosyaların ayrıntılı envanteri [kod incelemesinde](docs/code-review.md) bulunur.

## Oyun ve animasyonların işleyişi

Pac-Man, başlat düğmesi veya WASD/yön tuşlarıyla başlar. İlk çalıştırmada düğmeyi yeme animasyonu oynar ve karakter 40 CSS piksel boyutuyla sayfa oyununa geçer. Son yönünde ilerlemeye devam eder; WASD/yön tuşları yönünü değiştirir. Escape, pencere odağının kaybı, bağlantıya tıklama veya fare tekerleği oyunu duraklatır. Duraklatılan metinler tekrar görünür. Sıfırla, skoru ve yenmiş karakterleri temizler. Yönler düğmesi dokunmatik kontrolleri açar; bu düğmeler klavyeyle de etkinleştirilebilir.

Konum ve animasyon kareleri `ref` değerlerinde tutulur; her karede React state güncellenmez. React yalnızca skor, oyun durumu veya kontrol görünürlüğü gibi arayüz değişikliklerini işler. Oyun dururken sayfa oyununun animasyon döngüsü yeni kare istemez.

Başlatıcı ile sayfa oyunu tarayıcı olayları üzerinden haberleşir:

| Olay | Amaç |
| --- | --- |
| `portfolio-play` | Karşılama başlatma animasyonunu iste |
| `portfolio-game-ready` | `{ x, y }` belge koordinatlarıyla oyuna devret |
| `portfolio-cancel-intro` | Başlangıç animasyonunu iptal et |
| `portfolio-reset` | Başlatıcıyı başlangıç durumuna getir |

Zarfın dört parçası `EnvelopeBack`, `EnvelopeFlap`, `Letter`, `EnvelopeFront` olarak işaretlidir. Katmanlar sabittir; kapak açıldıktan sonra tek kâğıt yalnızca `translateY` ile yükselir. İletişim kartları e-posta, GitHub ve LinkedIn bağlantılarını taşır.

## Stil dosyaları

`App.css` temel stilleri; bileşen CSS dosyaları ilgili bölümleri; `Home.css`, `RobotExperience.css`, `WelcomeLayout.css` ve `LayoutRefinements.css` ana sayfa düzenlemelerini içerir. Birçok kural sonradan eklenen kurallarla geçersiz kılınır. Yeni bir stil eklemeden önce seçicinin mevcut tanımlarını ve import sırasını kontrol edin; özellikle mobil medya sorgularını birlikte değerlendirin.

## Güvenlik ve isteğe bağlı içerik

`.env`, `.env.*`, özel anahtar dosyaları, `node_modules/`, `dist/`, `.vercel/` ve `tmp/` Git dışında tutulur. `.env.example` için istisna vardır; yalnızca örnek değerler içermelidir. İleride eklenecek `VITE_*` değerleri tarayıcı paketine gireceği için gizli bilgi olarak kullanılmamalıdır.

Dış bağlantılar yeni sekmede açıldığında `rel="noopener noreferrer"` taşır. Varsayılan yapılandırmada iframe oyunu yoktur (`games[0].src: null`); Phaser bağımlılığı kurulu değildir. İleride iframe eklenecekse yalnızca güvenilir içeriğe izin verin. Mevcut `allow-scripts allow-same-origin` izinleri aynı kökendeki güvenilmeyen içerik için güvenli bir yalıtım garantisi değildir.

## Test kapsamı ve sınırlar

Testler; hareket ve sınır hesaplarını, başlatma zamanlamasını, sprite çizimini, bölüm/bağlantı yapısını ve Türkçe/İngilizce içerik çıktısını kontrol eder. Bazı eski zamanlama yardımcıları yalnızca testlerde kullanılır. Testlerin tamamı gerçek tarayıcı etkileşim testi değildir; statik çıktı testleri tek başına animasyon görünümünü doğrulamaz.

20 Ekim 2026 incelemesinde lint, build ve 18 test geçti. Ek yerel Edge/Chromium kontrollerinde 320, 375, 768 ve 1280 piksel genişlikler; başlatma, duraklatma, devam etme, sıfırlama, dil geçişi ve mobil menü kontrol edildi. Safari, Firefox, gerçek telefonlar ve kapsamlı ekran okuyucu testleri ayrıca yapılmalıdır. Ayrıntılar ve açık bakım konuları: [Kod inceleme raporu](docs/code-review.md).

## Vercel'de yayınlama

GitHub deposunu Vercel'e içe aktarın:

- Framework: **Vite**
- Root Directory: **`./`** — bu GitHub deposunda `package.json` kökte bulunur
- Build Command: **`npm run build`**
- Output Directory: **`dist`**
- Node.js: **24.x**

Varsayılan kurulum için environment variable gerekmez. Bölümler hash bağlantıları kullandığından ayrıca bir istemci router yönlendirme kuralı gerekmez. Yayına çıkmadan önce `npm run lint`, `npm test` ve `npm run build` çalıştırın.

Robot, masa ve diğer görsel varlıklar üzerinde üretim araçlarından yararlanılmıştır. Projenin bakımı açısından esas kaynaklar bu depodaki kod, veri dosyaları ve doğrulama adımlarıdır.