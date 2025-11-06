
const translations = {
  id: {
    kicker: 'Local Guide • Buton • Muna • Wakatobi',
    title: 'Jelajahi Buton, Muna & Wakatobi bersama guide lokal',
    lead: 'Trip laut & darat: snorkeling, diving, trekking, homestay budaya. Santai, aman, berkesan.',
    book: 'Pesan Sekarang',
    packages: 'Paket Wisata',
    about: 'Tentang Kami',
    contact: 'Kontak',
    footer: 'La Ode Ibnu Rajab — Local Guide & Founder',
    pkg1_title: '1 Hari Island Hopping',
    pkg1_desc: 'Snorkeling, pantai, makan siang di pulau. Cocok keluarga.',
    pkg1_price: 'Mulai dari IDR 350.000',
    pkg2_title: '3 Hari 2 Malam — Adventure & Budaya',
    pkg2_desc: 'Snorkeling/diving, trekking, homestay budaya.',
    pkg2_price: 'Mulai dari IDR 1.850.000',
    pkg3_title: 'Diving Trip Eksklusif',
    pkg3_desc: 'Pemandu dive, peralatan, dan akses spot terbaik.',
    pkg3_price: 'Hubungi untuk harga',
    booking_label_name: 'Nama',
    booking_label_people: 'Jumlah Orang',
    booking_label_date: 'Tanggal Trip',
    booking_label_package: 'Pilih Paket',
    booking_btn: 'Kirim ke WhatsApp'
  },
  en: {
    kicker: 'Local Guide • Buton • Muna • Wakatobi',
    title: 'Explore Buton, Muna & Wakatobi with a local guide',
    lead: 'Sea & land trips: snorkeling, diving, trekking, cultural homestays. Relaxed, safe, memorable.',
    book: 'Book Now',
    packages: 'Tour Packages',
    about: 'About Us',
    contact: 'Contact',
    footer: 'La Ode Ibnu Rajab — Local Guide & Founder',
    pkg1_title: '1-Day Island Hopping',
    pkg1_desc: 'Snorkeling, beach, and island lunch. Great for families.',
    pkg1_price: 'From IDR 350,000',
    pkg2_title: '3D/2N — Adventure & Culture',
    pkg2_desc: 'Snorkeling/diving, trekking, cultural homestays.',
    pkg2_price: 'From IDR 1,850,000',
    pkg3_title: 'Exclusive Diving Trip',
    pkg3_desc: 'Guide, equipment, and access to top dive sites.',
    pkg3_price: 'Contact for price',
    booking_label_name: 'Name',
    booking_label_people: 'Number of people',
    booking_label_date: 'Trip date',
    booking_label_package: 'Choose package',
    booking_btn: 'Send to WhatsApp'
  }
};

function setLang(lang){
  document.querySelectorAll('[data-trans]').forEach(el=>{
    const key = el.getAttribute('data-trans');
    if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
}

// default language ID
setLang('id');
document.getElementById('btn-id').addEventListener('click', ()=> setLang('id'));
document.getElementById('btn-en').addEventListener('click', ()=> setLang('en'));

// WhatsApp button (global)
const waNumber = '6282239211302';
const waMessageDefault = encodeURIComponent('Halo, saya tertarik dengan paket wisata Buton Muna & Wakatobi Explore. Mohon info lebih lanjut ya!');
document.querySelectorAll('#wa-btn').forEach(el=>{
    try{ el.setAttribute('href', `https://wa.me/${waNumber}?text=${waMessageDefault}`); }
    catch(e){}
});
// also set the floating wa button if present
try{ document.getElementById('wa-btn').setAttribute('href', `https://wa.me/${waNumber}?text=${waMessageDefault}`); } catch(e){}

// Booking form -> open WhatsApp with filled message
function sendBookingToWhatsApp(formId){
  const form = document.getElementById(formId);
  const name = encodeURIComponent(form.querySelector('[name=name]').value || '-');
  const people = encodeURIComponent(form.querySelector('[name=people]').value || '1');
  const date = encodeURIComponent(form.querySelector('[name=date]').value || '-');
  const pkg = encodeURIComponent(form.querySelector('[name=package]').value || '-');
  const note = encodeURIComponent(form.querySelector('[name=note]').value || '-');
  const msg = `Halo, saya ingin memesan paket wisata.%0ANama: ${name}%0AJumlah orang: ${people}%0ATanggal: ${date}%0APaket: ${pkg}%0ACatatan: ${note}`;
  const url = `https://wa.me/${waNumber}?text=${msg}`;
  window.open(url, '_blank');
}

// Enhance package booking buttons to prefill package field
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.book-pkg').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const pkg = e.currentTarget.getAttribute('data-pkg') || '';
      // open contact page and prefill via localStorage
      localStorage.setItem('prefill_pkg', pkg);
      window.location.href = 'contact.html';
    });
  });

  // on contact page prefill if exists
  if(document.getElementById('bookingForm')){
    const pkg = localStorage.getItem('prefill_pkg');
    if(pkg){
      const sel = document.getElementById('packageSelect');
      if(sel){ sel.value = pkg; }
      localStorage.removeItem('prefill_pkg');
    }
  }
});
