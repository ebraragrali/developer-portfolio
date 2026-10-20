# İçerik ve bağlantı doğrulaması

Kontrol tarihi: 17 Ekim 2026.

## Bilgi kaynağı

Eğitim, deneyim, beceriler, sertifikalar ve proje açıklamalarının kaynağı kullanıcının bu görevde paylaştığı metindir. Mesajda veya görev ek klasöründe PDF CV bulunmadığından CV ile karşılaştırma yapılamadı. Not ortalaması, telefon numarası veya ek başarı iddiası eklenmedi.

Kullanıcı metnindeki Oyun ve Uygulama Akademisi sertifika yılı 2023 olarak korundu. Arama sonucu LinkedIn indeksinde aynı adlı sertifika Ağustos 2024 göründüğünden bu tarih PDF geldiğinde ayrıca karşılaştırılmalıdır; kullanıcı bilgisi sessizce değiştirilmedi.

## Doğrulanmış proje bağlantıları

GitHub kullanıcı API'si üzerinden gerçek depo listesi alındı; her deponun README dosyası ayrı okunarak başlık, amaç ve teknoloji eşleşmesi kontrol edildi.

| Proje | Doğrulanan depo | Eşleşme kanıtı |
| --- | --- | --- |
| Okul Yönetim Sistemi | https://github.com/ebraragrali/database_school_management_project | README: School Management System, Java Swing, MySQL |
| Yüz Gerçekliği Tespiti | https://github.com/ebraragrali/real-vs-ai-faces | README: Real vs AI-Generated Face Classification; CNN, ResNet50 |
| PrepMate | https://github.com/ebraragrali/YZTA-Bootcamp | Kullanıcının takım projesi forku; README'de PrepMate, YDS/YÖKDİL, React, Firebase, Gemini ve Ebrar Ağralı ekip kaydı |
| TEKNOFEST Yer İstasyonu | https://github.com/ebraragrali/teknofest-model-uydu-gui-2025 | README: PyQt6 yer istasyonu, telemetri ve gerçek zamanlı grafikler |

Bu dört proje için belirsiz veya tahmin edilmiş URL kullanılmadı. Depo bağlantısı sonradan kaldırılırsa kart bağlantısız article olarak gösterilir; sahte GitHub butonu üretilmez. Ekran görüntüsü sağlanmadığından mevcut sahte proje ekranları kaldırıldı; gerçek proje açıklamaları gösteriliyor.

## İletişim

- GitHub profil adresi https://github.com/ebraragrali doğrudan HTTP 200 döndü.
- LinkedIn https://www.linkedin.com/in/ebraragrali otomatik HTTP kontrolüne 999 yanıtı verdi. Arama indeksinde aynı profil ve eğitim/proje bilgileri bulunuyor, ancak doğrudan erişim doğrulaması tamamlanamadı. Kullanıcının verdiği adres korundu.
- E-posta bağlantısı tam olarak mailto:ebraragrali1@gmail.com. Mesaj gönderilmedi; teslim edilebilirlik kontrolü yapılmadı.
- Sertifikalar için doğrulanmamış bağlantı veya sertifika dosyası eklenmedi.
- CV indirme düğmesi, CV sayfası veya herkese açık CV dosyası yok. Talep e-posta ile yapılıyor.

## Kontroller

- npm run build: başarılı.
- node --test tests/gamePhysics.test.mjs tests/greetingExperience.test.mjs tests/portfolioContent.test.mjs: 12 test başarılı.
- TR/EN bölümleri gerçek React bileşenleriyle statik HTML'e render edilerek kontrol edildi. Dört güvenli proje bağlantısı, mailto, sertifikalar, kronoloji ve CV indirme bulunmaması test edildi.
- Responsive CSS, mobilde tek sütun ve dar ekranlarda açılır navigasyon içeriyor. Bağlı tarayıcı envanteri boş olduğundan gerçek mobil görüntü, canlı dil düğmesi, robot ve oyun etkileşimi için tarayıcı QA tamamlanamadı. Birim/render testleri bu kontrollerin yerine geçmez.
- Robot, Pac-Man başlangıç animasyonu, oyun hareket/çarpışma mantığı ve kablo bileşenleri bu görevde değiştirilmedi.
- Commit veya push yapılmadı.
