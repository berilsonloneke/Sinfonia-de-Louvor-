import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Image as ImageIcon, 
  Calendar, 
  Mail, 
  Music, 
  Settings, 
  Menu, 
  X, 
  Youtube, 
  Instagram, 
  Facebook,
  ExternalLink,
  ChevronRight,
  Play,
  Clock,
  MapPin,
  BarChart3,
  Plus,
  Trash2,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Content, Event, GalleryItem, Ad, Stats } from './types';

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'about', label: 'Sobre Nós', icon: Users },
    { id: 'gallery', label: 'Galeria', icon: ImageIcon },
    { id: 'events', label: 'Agenda', icon: Calendar },
    { id: 'media', label: 'Mídia', icon: Music },
    { id: 'contact', label: 'Contato', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center mr-3">
              <Music className="text-brand-bg w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Sinfonia de Louvor</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activePage === item.id 
                      ? 'text-brand-accent bg-white/5' 
                      : 'text-gray-300 hover:text-brand-accent hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setActivePage('admin')}
                className="p-2 text-gray-400 hover:text-brand-accent transition-colors"
                title="Painel Admin"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg border-b border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activePage === item.id 
                      ? 'text-brand-accent bg-white/5' 
                      : 'text-gray-300 hover:text-brand-accent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon size={18} className="mr-3" />
                    {item.label}
                  </div>
                </button>
              ))}
              <button
                onClick={() => {
                  setActivePage('admin');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-brand-accent hover:bg-white/5"
              >
                <div className="flex items-center">
                  <Settings size={18} className="mr-3" />
                  Painel Admin
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <footer className="bg-black/40 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center mr-3">
                <Music className="text-brand-bg w-6 h-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight">Sinfonia de Louvor</span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Coral Jovem Sinfonia de Louvor Jerusalém de Caála, Huambo. 
              Dedicados a louvar a Deus através da música coral e servir a nossa comunidade.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-accent hover:bg-white/10 transition-all">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-accent hover:bg-white/10 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-accent hover:bg-white/10 transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              <li><button onClick={() => setActivePage('about')} className="text-gray-400 hover:text-brand-accent transition-colors">Sobre Nós</button></li>
              <li><button onClick={() => setActivePage('events')} className="text-gray-400 hover:text-brand-accent transition-colors">Agenda</button></li>
              <li><button onClick={() => setActivePage('gallery')} className="text-gray-400 hover:text-brand-accent transition-colors">Galeria</button></li>
              <li><button onClick={() => setActivePage('media')} className="text-gray-400 hover:text-brand-accent transition-colors">Mídia</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><button onClick={() => setActivePage('privacy')} className="text-gray-400 hover:text-brand-accent transition-colors">Política de Privacidade</button></li>
              <li><button onClick={() => setActivePage('terms')} className="text-gray-400 hover:text-brand-accent transition-colors">Termos de Uso</button></li>
              <li><button onClick={() => setActivePage('ads-disclaimer')} className="text-gray-400 hover:text-brand-accent transition-colors">Disclaimer de Ads</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2026 Coral Jovem Sinfonia de Louvor Jerusalém. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            Caála, Huambo, Angola
          </p>
        </div>
      </div>
    </footer>
  );
};

const AdBanner = ({ ads }: { ads: Ad[] }) => {
  if (ads.length === 0) return null;
  
  const trackAdClick = () => {
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'ad_click' })
    });
  };

  return (
    <div className="my-12 p-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
      <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Publicidade</span>
      <div 
        onClick={trackAdClick}
        dangerouslySetInnerHTML={{ __html: ads[0].code }} 
        className="max-w-full overflow-hidden"
      />
    </div>
  );
};

// --- Pages ---

const HomePage = ({ content, ads, setActivePage }: { content: Content, ads: Ad[], setActivePage: (p: string) => void }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=2070" 
            alt="Choir background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-detail/30 border border-brand-detail text-brand-accent text-sm font-medium mb-6">
              Coral Jovem de Caála
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {content.home_hero_title || 'Sinfonia de Louvor Jerusalém'}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-10">
              {content.home_hero_subtitle || 'Elevando vozes e corações em louvor e adoração no coração de Angola.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <button 
                onClick={() => setActivePage('media')}
                className="px-8 py-4 bg-brand-accent text-brand-bg font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center"
              >
                <Play size={20} className="mr-2 fill-current" /> Ouvir Músicas
              </button>
              <button 
                onClick={() => setActivePage('about')}
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center"
              >
                Conheça Nossa História
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner ads={ads} />

        {/* Features Section */}
        <section className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-brand-detail/20 rounded-2xl flex items-center justify-center text-brand-accent mb-6">
                <Music size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Música Sacra</h3>
              <p className="text-gray-400">Repertório diversificado que abrange desde hinos clássicos até composições contemporâneas.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-brand-detail/20 rounded-2xl flex items-center justify-center text-brand-accent mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Comunidade</h3>
              <p className="text-gray-400">Um espaço de crescimento espiritual e social para jovens talentosos de Caála.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-brand-detail/20 rounded-2xl flex items-center justify-center text-brand-accent mb-6">
                <Calendar size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Eventos</h3>
              <p className="text-gray-400">Apresentações regulares em cultos, concertos e eventos especiais em todo o Huambo.</p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

const AboutPage = ({ content }: { content: Content }) => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-4">Nossa História</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Sobre o Coral Sinfonia de Louvor</h1>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>{content.about_history}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-brand-detail/20 blur-3xl rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=2070" 
            alt="Choir rehearsal" 
            className="relative rounded-3xl shadow-2xl border border-white/10"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-10 bg-brand-detail/10 border border-brand-detail/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4 text-brand-accent">Missão</h3>
          <p className="text-gray-300 text-lg">{content.mission}</p>
        </div>
        <div className="p-10 bg-white/5 border border-white/10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Valores</h3>
          <p className="text-gray-300 text-lg">{content.values}</p>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = ({ items }: { items: GalleryItem[] }) => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeria de Momentos</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Registros de nossas apresentações, ensaios e momentos de comunhão.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="group relative aspect-square overflow-hidden rounded-3xl bg-white/5 border border-white/10"
          >
            <img 
              src={item.type === 'image' ? item.url : (item.thumbnail || 'https://images.unsplash.com/photo-1514320298574-2b9d53091225?auto=format&fit=crop&q=80&w=800')} 
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <p className="text-white font-medium">{item.caption}</p>
              {item.type === 'video' && (
                <div className="mt-2 flex items-center text-brand-accent text-sm">
                  <Play size={14} className="mr-1 fill-current" /> Vídeo
                </div>
              )}
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            Nenhum item na galeria ainda.
          </div>
        )}
      </div>
    </div>
  );
};

const EventsPage = ({ events }: { events: Event[] }) => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda e Eventos</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Acompanhe nossas próximas apresentações, ensaios e concertos.
        </p>
      </div>

      <div className="space-y-6">
        {events.length > 0 ? events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-start md:items-center"
          >
            <div className="flex-shrink-0 w-24 h-24 bg-brand-detail/20 rounded-2xl flex flex-col items-center justify-center text-brand-accent">
              <span className="text-3xl font-bold">{new Date(event.date).getDate()}</span>
              <span className="text-xs uppercase tracking-widest font-bold">
                {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
              </span>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-brand-accent" />
                  {new Date(event.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-brand-accent" />
                  {event.location}
                </div>
              </div>
              <p className="mt-4 text-gray-300">{event.description}</p>
            </div>
            
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all font-bold">
              Ver Detalhes
            </button>
          </motion.div>
        )) : (
          <div className="py-20 text-center text-gray-500 bg-white/5 rounded-3xl border border-white/10">
            Nenhum evento agendado no momento.
          </div>
        )}
      </div>
    </div>
  );
};

const MediaPage = () => {
  const platforms = [
    { name: 'YouTube', icon: Youtube, color: '#FF0000', link: '#', description: 'Assista nossas apresentações ao vivo e clipes.' },
    { name: 'Spotify', icon: Music, color: '#1DB954', link: '#', description: 'Ouça nossos álbuns e singles oficiais.' },
    { name: 'Instagram', icon: Instagram, color: '#E4405F', link: '#', description: 'Bastidores e pequenos trechos de ensaios.' },
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Mídia e Streaming</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Ouça e assista o Coral Sinfonia de Louvor em suas plataformas favoritas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {platforms.map((p) => (
          <motion.a
            key={p.name}
            href={p.link}
            whileHover={{ y: -10 }}
            className="p-10 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center text-center group"
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${p.color}20`, color: p.color }}
            >
              <p.icon size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{p.name}</h3>
            <p className="text-gray-400 mb-8">{p.description}</p>
            <span className="text-brand-accent font-bold flex items-center">
              Acessar Agora <ChevronRight size={16} className="ml-1" />
            </span>
          </motion.a>
        ))}
      </div>

      <div className="bg-brand-detail/10 border border-brand-detail/20 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Downloads de Partituras e Áudios</h2>
        <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
          Disponibilizamos materiais para outros corais e interessados em nosso repertório.
        </p>
        <button className="px-10 py-4 bg-brand-accent text-brand-bg font-bold rounded-full hover:scale-105 transition-transform">
          Acessar Área de Downloads
        </button>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Entre em Contato</h1>
          <p className="text-gray-400 text-lg mb-12">
            Tem alguma dúvida, convite ou quer fazer parte do nosso coral? 
            Estamos ansiosos para ouvir você.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mr-6 flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">E-mail</h4>
                <p className="text-gray-400">contato@sinfoniadelouvor.ao</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mr-6 flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Localização</h4>
                <p className="text-gray-400">Caála, Huambo, Angola</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mr-6 flex-shrink-0">
                <Youtube size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Redes Sociais</h4>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors">YouTube</a>
                  <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors">Facebook</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Nome Completo</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="Seu nome" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">E-mail</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Assunto</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="Como podemos ajudar?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Mensagem</label>
              <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="Sua mensagem aqui..."></textarea>
            </div>
            <button className="w-full py-4 bg-brand-accent text-brand-bg font-bold rounded-xl hover:scale-[1.02] transition-transform">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ 
  content, 
  events, 
  gallery, 
  ads, 
  stats,
  onUpdateContent,
  onAddEvent,
  onDeleteEvent,
  onAddGallery,
  onDeleteGallery,
  onAddAd,
  onDeleteAd
}: { 
  content: Content, 
  events: Event[], 
  gallery: GalleryItem[], 
  ads: Ad[], 
  stats: Stats,
  onUpdateContent: (k: string, v: string) => void,
  onAddEvent: (e: any) => void,
  onDeleteEvent: (id: number) => void,
  onAddGallery: (i: any) => void,
  onDeleteGallery: (id: number) => void,
  onAddAd: (a: any) => void,
  onDeleteAd: (id: number) => void
}) => {
  const [activeTab, setActiveTab] = useState('stats');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="pt-40 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <div className="w-16 h-16 bg-brand-detail/20 rounded-2xl flex items-center justify-center text-brand-accent mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
          <p className="text-gray-400 mb-8">Insira a senha de administrador para continuar.</p>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-brand-accent"
            placeholder="Senha"
          />
          <button 
            onClick={() => password === 'admin123' ? setIsLoggedIn(true) : alert('Senha incorreta')}
            className="w-full py-3 bg-brand-accent text-brand-bg font-bold rounded-xl"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 space-y-2">
            <button onClick={() => setActiveTab('stats')} className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'stats' ? 'bg-brand-accent text-brand-bg font-bold' : 'text-gray-400 hover:bg-white/5'}`}>
              <BarChart3 size={18} className="mr-3" /> Estatísticas
            </button>
            <button onClick={() => setActiveTab('content')} className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'content' ? 'bg-brand-accent text-brand-bg font-bold' : 'text-gray-400 hover:bg-white/5'}`}>
              <Users size={18} className="mr-3" /> Conteúdo
            </button>
            <button onClick={() => setActiveTab('events')} className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'events' ? 'bg-brand-accent text-brand-bg font-bold' : 'text-gray-400 hover:bg-white/5'}`}>
              <Calendar size={18} className="mr-3" /> Agenda
            </button>
            <button onClick={() => setActiveTab('gallery')} className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'gallery' ? 'bg-brand-accent text-brand-bg font-bold' : 'text-gray-400 hover:bg-white/5'}`}>
              <ImageIcon size={18} className="mr-3" /> Galeria
            </button>
            <button onClick={() => setActiveTab('ads')} className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'ads' ? 'bg-brand-accent text-brand-bg font-bold' : 'text-gray-400 hover:bg-white/5'}`}>
              <ExternalLink size={18} className="mr-3" /> Anúncios
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white/5 border border-white/10 rounded-3xl p-8">
          {activeTab === 'stats' && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Estatísticas do Site</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-brand-detail/10 border border-brand-detail/20 rounded-3xl">
                  <span className="text-gray-400 text-sm uppercase tracking-widest mb-2 block">Total de Visitas</span>
                  <span className="text-5xl font-bold text-brand-accent">{stats.visits}</span>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <span className="text-gray-400 text-sm uppercase tracking-widest mb-2 block">Cliques em Anúncios</span>
                  <span className="text-5xl font-bold">{stats.adClicks}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Gerenciar Conteúdo</h2>
              <div className="space-y-6">
                {Object.entries(content).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">{key.replace(/_/g, ' ')}</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                      rows={3}
                      defaultValue={value}
                      onBlur={(e) => onUpdateContent(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Agenda de Eventos</h2>
                <button 
                  onClick={() => {
                    const title = prompt('Título do Evento:');
                    const date = prompt('Data (YYYY-MM-DD HH:MM):');
                    const location = prompt('Local:');
                    const description = prompt('Descrição:');
                    if (title && date && location) onAddEvent({ title, date, location, description });
                  }}
                  className="p-2 bg-brand-accent text-brand-bg rounded-full hover:scale-110 transition-transform"
                >
                  <Plus size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div>
                      <h4 className="font-bold">{event.title}</h4>
                      <p className="text-sm text-gray-400">{event.date} - {event.location}</p>
                    </div>
                    <button onClick={() => onDeleteEvent(event.id)} className="text-red-500 hover:text-red-400 p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Galeria de Mídia</h2>
                <button 
                  onClick={() => {
                    const type = prompt('Tipo (image/video):') as 'image' | 'video';
                    const url = prompt('URL da Imagem/Vídeo:');
                    const caption = prompt('Legenda:');
                    if (type && url && caption) onAddGallery({ type, url, caption });
                  }}
                  className="p-2 bg-brand-accent text-brand-bg rounded-full hover:scale-110 transition-transform"
                >
                  <Plus size={24} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map(item => (
                  <div key={item.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-white/10">
                    <img src={item.url} alt={item.caption} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => onDeleteGallery(item.id)} className="bg-red-500 text-white p-2 rounded-full">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Gerenciar Anúncios</h2>
                <button 
                  onClick={() => {
                    const title = prompt('Título do Anúncio:');
                    const code = prompt('Código HTML/Script do Anúncio:');
                    if (title && code) onAddAd({ title, code });
                  }}
                  className="p-2 bg-brand-accent text-brand-bg rounded-full hover:scale-110 transition-transform"
                >
                  <Plus size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {ads.map(ad => (
                  <div key={ad.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold">{ad.title}</h4>
                      <button onClick={() => onDeleteAd(ad.id)} className="text-red-500 hover:text-red-400 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <pre className="text-xs bg-black/40 p-4 rounded-xl overflow-x-auto text-gray-400">
                      {ad.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [content, setContent] = useState<Content>({});
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [stats, setStats] = useState<Stats>({ visits: 0, adClicks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, eRes, gRes, aRes, sRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/events'),
          fetch('/api/gallery'),
          fetch('/api/ads'),
          fetch('/api/stats/summary')
        ]);
        
        setContent(await cRes.json());
        setEvents(await eRes.json());
        setGallery(await gRes.json());
        setAds(await aRes.json());
        setStats(await sRes.json());
        
        // Track visit
        fetch('/api/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'visit' })
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleUpdateContent = async (key: string, value: string) => {
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    setContent({ ...content, [key]: value });
  };

  const handleAddEvent = async (event: any) => {
    await fetch('/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    const res = await fetch('/api/events');
    setEvents(await res.json());
  };

  const handleDeleteEvent = async (id: number) => {
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
    setEvents(events.filter(e => e.id !== id));
  };

  const handleAddGallery = async (item: any) => {
    await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    const res = await fetch('/api/gallery');
    setGallery(await res.json());
  };

  const handleDeleteGallery = async (id: number) => {
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    setGallery(gallery.filter(i => i.id !== id));
  };

  const handleAddAd = async (ad: any) => {
    await fetch('/api/admin/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ad)
    });
    const res = await fetch('/api/ads');
    setAds(await res.json());
  };

  const handleDeleteAd = async (id: number) => {
    await fetch(`/api/admin/ads/${id}`, { method: 'DELETE' });
    setAds(ads.filter(a => a.id !== id));
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-brand-bg">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent selection:text-brand-bg">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === 'home' && <HomePage content={content} ads={ads} setActivePage={setActivePage} />}
            {activePage === 'about' && <AboutPage content={content} />}
            {activePage === 'gallery' && <GalleryPage items={gallery} />}
            {activePage === 'events' && <EventsPage events={events} />}
            {activePage === 'media' && <MediaPage />}
            {activePage === 'contact' && <ContactPage />}
            {activePage === 'admin' && (
              <AdminDashboard 
                content={content} 
                events={events} 
                gallery={gallery} 
                ads={ads} 
                stats={stats}
                onUpdateContent={handleUpdateContent}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
                onAddGallery={handleAddGallery}
                onDeleteGallery={handleDeleteGallery}
                onAddAd={handleAddAd}
                onDeleteAd={handleDeleteAd}
              />
            )}
            
            {/* Legal Pages */}
            {activePage === 'privacy' && (
              <div className="pt-32 pb-24 max-w-3xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
                <div className="prose prose-invert max-w-none text-gray-400">
                  <p>Sua privacidade é importante para nós. É política do Coral Sinfonia de Louvor respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.</p>
                  <h2 className="text-white text-2xl mt-8 mb-4">Coleta de Dados</h2>
                  <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
                  <h2 className="text-white text-2xl mt-8 mb-4">Uso de Cookies</h2>
                  <p>Utilizamos cookies para melhorar sua experiência e para fins de publicidade (Google AdSense).</p>
                </div>
              </div>
            )}
            {activePage === 'terms' && (
              <div className="pt-32 pb-24 max-w-3xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
                <div className="prose prose-invert max-w-none text-gray-400">
                  <p>Ao acessar o site do Coral Sinfonia de Louvor, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
                  <h2 className="text-white text-2xl mt-8 mb-4">Licença de Uso</h2>
                  <p>É concedida permissão para baixar temporariamente uma cópia dos materiais no site para visualização transitória pessoal e não comercial apenas.</p>
                </div>
              </div>
            )}
            {activePage === 'ads-disclaimer' && (
              <div className="pt-32 pb-24 max-w-3xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Disclaimer de Ads</h1>
                <div className="prose prose-invert max-w-none text-gray-400">
                  <p>Este site utiliza o Google AdSense e outras plataformas de publicidade para exibir anúncios. Esses serviços utilizam cookies para veicular anúncios com base em suas visitas anteriores a este ou outros sites.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setActivePage={setActivePage} />
      
      {/* Cookie Consent */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-brand-detail/90 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center gap-6"
        >
          <p className="text-sm text-white/90 text-center sm:text-left">
            Usamos cookies para melhorar sua experiência e exibir anúncios relevantes. Ao continuar, você concorda com nossa política.
          </p>
          <button 
            onClick={(e) => (e.currentTarget.parentElement?.parentElement as HTMLElement).style.display = 'none'}
            className="px-6 py-2 bg-brand-accent text-brand-bg font-bold rounded-full whitespace-nowrap"
          >
            Aceitar
          </button>
        </motion.div>
      </div>
    </div>
  );
}
