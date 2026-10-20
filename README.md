Portfolio

React + TypeScript + Vite ile geliştirilen, Türkçe ve İngilizce destekli tek sayfalık kişisel portfolyo. Ek backend veya yeni çalışma zamanı bağımlılığı kullanılmaz.

## Çalıştırma

```sh
npm install
npm run dev
npm run build
npm run preview
```

## İçerik ve yapı

- `src/App.tsx`: dil tercihi, gezinme, ana sayfa ve bileşenlerin birleştirilmesi.
- `src/data/content.ts`: TR/EN gezinme ve giriş metinleri, gerçek iletişim adresleri, oyun yapılandırması.
- `src/data/portfolio.ts`: iki dilde eğitim, proje, deneyim, beceri ve sertifika verileri; doğrulanmış proje bağlantıları.
- `src/components/PortfolioSections.tsx`: gerçek içerikli bölümler ve güvenli proje kartları.
- `src/components/PortfolioSections.css`: içerik düzeni, zaman çizelgesi, responsive kartlar ve navigasyon.
- `src/components/RobotGreeting.tsx`: tek sabit karşılama karakteri, doğrudan görünen TR/EN mesajı ve kapatılabilir konuşma balonu.
- `src/components/PacmanLauncher.tsx`: düğmeyi yiyerek başlayan Pac-Man animasyonu.
- `src/components/PageGame.tsx`: bütün sayfada hareket, sembol/harf toplama, skor, kamera takibi, klavye ve dokunmatik kontroller.
- `src/components/Workstation.tsx`: bölüm bağlantıları içeren etkileşimli SVG masa.
- `src/components/ElectricalCables.tsx`: pembe/mor kablo ağı.

Kişisel içerik ve bağlantı doğrulama notları: [docs/content-verification.md](docs/content-verification.md). Bu göreve PDF eklenmediğinden içerik kullanıcının verdiği metne göre hazırlandı.

## Proje kartları ve iletişim

GitHub adresi doğrulanmış projenin tamamı tek bir bağlantıdır; yeni sekmede `rel="noopener noreferrer"` ile açılır. İçinde başka buton veya bağlantı bulunmaz. Depo adresi `null` olduğunda kart bağlantısız gösterilir. Gerçek ekran görüntüleri verilmediği için sahte ekran görüntüsü kullanılmaz.

E-posta `mailto:` ile, GitHub ve LinkedIn profil adresleri gerçek bağlantılarla açılır. CV herkese açık değildir; indirme düğmesi veya CV sayfası yoktur. İletişim bölümü, e-posta, GitHub ve LinkedIn bağlantılarını içeren mektup görünümünde sunulur.

## Oyun ve varlıklar

Pac-Man, Oyna/Başlat, WASD veya ok tuşlarıyla başlar. Önce başlat düğmesini yeme animasyonu oynar; sonra mevcut sayfa oyunu kontrolü açılır. Escape duraklatır. Sol alttaki kontrollerden dokunmatik yönler ve sıfırlama kullanılabilir. Yenilen harflerin yerleri korunur, duraklatılınca metinler tekrar okunabilir.

Pac-Man, kullanıcının sağladığı sprite dosyasından alınır. Karşılama karakteri yeni mint saçlı ve kulaklıklı referansa göre tek şeffaf görsel olarak kullanılır; önceki robot katmanları artık yüklenmez. Ayrıntılar `src/assets/mascot-v2/README.md` ve `src/assets/pacman/README.md` içindedir. Tam sprite sayfaları ekranda gösterilmez. `scripts/extract-sprites.ps1`, gerçek alfa kanallı varlıkları yeniden üretmek içindir.

Phaser oyunu eklemek için derlemeyi `public/games/my-game/` içine koyun, oyun asset yollarını göreli yapın ve `content.ts` içindeki `games[0].src` değerini `${import.meta.env.BASE_URL}games/my-game/index.html` olarak ayarlayın. Yalnızca güvendiğiniz oyun derlemelerini kullanın. Phaser oyununun responsive ölçek ve giriş kontrolleri kendi derlemesinde yapılandırılır.

## Doğrulama

```sh
npm run build
node --test tests/gamePhysics.test.mjs tests/greetingExperience.test.mjs tests/portfolioContent.test.mjs
```

Üretim derlemesi ve 18 test başarılıdır. TR/EN bölüm çıktıları, doğru bağlantılar ve oyun/zamanlama mantığı test edilir. Tarayıcı bağlı olmadığı için gerçek mobil görünüm ve canlı UI etkileşimlerinin görsel doğrulaması tamamlanmadı.



## Güncel karşılama karakteri

Önceki robotun katmanlı kol/yüz çizimleri giriş bileşeninden çıkarıldı. `src/assets/welcome-character-white-legs.png`, mint saçlı/kulaklıklı karakterin koyu zeminde görünür beyaz bacaklı sürümüdür. `RobotGreeting.tsx` bu görseli sabit gösterir; yazı makinesi, yüz değişimi ve kol animasyonu çalıştırmaz. Mesaj Türkçe/İngilizce olarak doğrudan görünür ve kapatılabilir. Pac-Man başlatma ve oyun bileşenleri korunmuştur. Eski görsel varlıklar silinmedi, ancak artık girişte import edilmez ve üretim paketine katılmaz.


Karşılama düzeninde küçük karakter solda, yenilebilir tanıtım sağdadır. `WelcomeLayout.css` bu yerleşimi ve başlangıç Pac-Man boyutunu düzenler; etkileşimli masa sağ altta korunur. Pac-Man, düğme / çıkış / sayfa oyunu boyunca 40px boyutunu korur. Çıkış yolu ilk başlık harfinin hemen önüne gider, ardından mevcut sağa hareket ve harf toplama sistemi devralır. Dar ekranlarda karakter ve tanıtım sırayla alt alta yerleşir. Geçiş geometrisi ve sabit boyut davranışı iki ek testle doğrulanır. Tarayıcıda görsel doğrulama yapılmadı.


Son yerleşimde karakter, karşılama balonu ve tanıtım yazısı yukarı alındı. WASD/yön tuşu açıklaması karşılama cümlesinin hemen altındadır. Pac-Man’in çıkışında otomatik dikey hedefleme yoktur; aynı boyut ve yükseklikte sağa devam eder, sonrasında kullanıcı WASD/oklarla yönlendirir. `AboutSection` ana sayfada masanın soluna taşınmıştır; `PortfolioSections` içinde tekrar oluşturulmaz. Tekil `about` hedefi ve içeriği korunur. Kablolar ve diğer kişisel içerikler değiştirilmedi.


Son boşluk düzenlemesi `LayoutRefinements.css` içindedir: Hakkımda metni büyütülüp sola yaklaştırıldı, masa genişletildi, ana sayfa/eğitim ve beceriler/projeler arasındaki fazla boşluklar azaltıldı. Eğitim kaydı başlığına yaklaştırıldı. Oyun alanı başlığı `#game-start` karşılama alanına gider; yanında dekoratif SVG oyun kumandası bulunur. İletişim bölümü pul, imza ve zarf kıvrımı içeren bir mektup olarak düzenlendi. Yalnızca üç iletişim bağlantısı vardır; CV talep cümlesi kaldırılmıştır. Üretim derlemesi ve 18 test başarılıdır; tarayıcıda görsel kontrol yapılmadı.
