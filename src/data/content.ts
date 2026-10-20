export type Language = 'en' | 'tr'
export const sectionIds = ['home','about','education','skills','projects','playground','experience','certifications','contact']
export const profile = {
 github:'https://github.com/ebraragrali',
 linkedin:'https://www.linkedin.com/in/ebraragrali',
 email:'ebraragrali1@gmail.com',
}
export const games:{id:string;src:string|null}[]=[{id:'phaser',src:null}]
export const copy={
 tr:{nav:['Ana sayfa','Hakkımda','Eğitim','Yetenekler','Projeler','Oyun alanı','Deneyim','Sertifikalar','İletişim'],intro:'Türk Hava Kurumu Üniversitesi’nde İngilizce Yazılım Mühendisliği 4. sınıf öğrencisiyim. Yazılım geliştirme, siber güvenlik, ağ teknolojileri ve yapay zekâ alanlarına ilgi duyuyorum.',skip:'İçeriğe geç',menu:'Gezinme menüsünü aç/kapat',footer:'Ebrar’ın kişisel köşesi.',phaser:'Phaser oyunum',instructions:'8 düğümü etkinleştir. Bağlamak için ışıklı düğümü seç.',score:'Bağlanan',done:'Devre tamamlandı!',restart:'Yeniden başlat'},
 en:{nav:['Home','About','Education','Skills','Projects','Playground','Experience','Certifications','Contact'],intro:'I’m a fourth-year student in the English-taught Software Engineering programme at the University of Turkish Aeronautical Association. I’m interested in software development, cybersecurity, networking and AI.',skip:'Skip to content',menu:'Toggle navigation',footer:'Ebrar’s little corner.',phaser:'My Phaser game',instructions:'Activate all 8 nodes. Select the illuminated node to connect it.',score:'Connected',done:'Circuit complete!',restart:'Restart'},
}
