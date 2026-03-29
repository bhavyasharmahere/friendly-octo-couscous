import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Music,
  Video,
  Sparkles,
  Zap,
  Crown,
  CheckCircle,
  ArrowRight,
  Copy,
  Star,
  Play,
  Loader2,
  AlertCircle,
  Search,
  Globe,
  Shield,
  Award,
  Users,
  Rocket,
  Flame,
  Diamond,
  Infinity,
  Layers,
  Sliders,
  X,
  Cpu
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animated background particles component
function BackgroundParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-500/20 rounded-full blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Floating icons component
function FloatingIcons() {
  const icons = [Play, Music, Video, Download, Zap, Sparkles, Crown, Flame];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon className="w-12 h-12 text-purple-400" />
        </motion.div>
      ))}
    </div>
  );
}

// Quality badge component
function QualityBadge({ quality }: { quality: string }) {
  const colors: Record<string, string> = {
    '4K': 'from-red-500 to-pink-600',
    '1080p': 'from-purple-500 to-purple-600',
    '720p': 'from-blue-500 to-cyan-600',
    '480p': 'from-green-500 to-emerald-600',
    '320kbps': 'from-amber-500 to-orange-600',
    '256kbps': 'from-indigo-500 to-blue-600',
    '128kbps': 'from-gray-500 to-slate-600',
  };
  
  const colorClass = colors[quality] || 'from-gray-500 to-slate-600';
  
  return (
    <motion.span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-bold text-white",
        "bg-gradient-to-r",
        colorClass,
        "shadow-lg"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {quality}
    </motion.span>
  );
}

// Format card component
function FormatCard({ 
  format, 
  quality, 
  size, 
  isSelected, 
  onSelect,
  icon: Icon 
}: { 
  format: string; 
  quality: string; 
  size: string; 
  isSelected: boolean;
  onSelect: () => void;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      className={cn(
        "relative p-4 rounded-2xl cursor-pointer transition-all duration-300",
        "glass",
        isSelected ? "ring-2 ring-purple-500 bg-purple-500/20" : "hover:bg-white/10"
      )}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-xl",
            isSelected ? "bg-purple-500" : "bg-white/10"
          )}>
            <Icon className={cn("w-5 h-5", isSelected ? "text-white" : "text-purple-400")} />
          </div>
          <div>
            <p className="font-semibold text-white">{format}</p>
            <p className="text-sm text-gray-400">{size}</p>
          </div>
        </div>
        <QualityBadge quality={quality} />
      </div>
      
      {isSelected && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <CheckCircle className="w-5 h-5 text-purple-400" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Stats card component
function StatsCard({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string; label: string; color: string }) {
  return (
    <motion.div
      className="glass p-4 rounded-2xl text-center"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={cn("inline-flex p-3 rounded-xl mb-2", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </motion.div>
  );
}

// Feature card component
function FeatureCard({ icon: Icon, title, description, delay }: { icon: React.ElementType; title: string; description: string; delay: number }) {
  return (
    <motion.div
      className="glass p-6 rounded-2xl text-left hover:bg-white/10 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.03, y: -10 }}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
}

// Download progress component
function DownloadProgress({ progress, format, quality }: { progress: number; format: string; quality: string }) {
  return (
    <motion.div
      className="glass p-6 rounded-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500">
            {format === 'MP3' ? (
              <Music className="w-5 h-5 text-white" />
            ) : (
              <Video className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <p className="font-semibold text-white">Downloading {format}</p>
            <p className="text-sm text-gray-400">Quality: {quality}</p>
          </div>
        </div>
        <span className="text-purple-400 font-bold">{Math.round(progress)}%</span>
      </div>
      
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
      
      {progress >= 100 && (
        <motion.div
          className="mt-4 flex items-center justify-center gap-2 text-green-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Download Complete!</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  const colors = {
    success: 'from-green-500 to-emerald-600',
    error: 'from-red-500 to-pink-600',
    info: 'from-blue-500 to-cyan-600',
  };
  
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Sparkles,
  };
  
  const Icon = icons[type];
  
  return (
    <motion.div
      className={cn(
        "fixed top-4 right-4 z-50 glass-strong p-4 rounded-2xl flex items-center gap-3 min-w-80",
        "border-l-4",
        type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-blue-500'
      )}
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
    >
      <div className={cn("p-2 rounded-xl bg-gradient-to-r", colors[type])}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-white">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-white">
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<'MP4' | 'MP3'>('MP4');
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const videoFormats = [
    { format: 'MP4', quality: '4K', size: '1.2 GB', icon: Video },
    { format: 'MP4', quality: '1080p', size: '450 MB', icon: Video },
    { format: 'MP4', quality: '720p', size: '280 MB', icon: Video },
    { format: 'MP4', quality: '480p', size: '150 MB', icon: Video },
  ];

  const audioFormats = [
    { format: 'MP3', quality: '320kbps', size: '8 MB', icon: Music },
    { format: 'MP3', quality: '256kbps', size: '6 MB', icon: Music },
    { format: 'MP3', quality: '128kbps', size: '3 MB', icon: Music },
  ];

  const handleFetchVideo = async () => {
    if (!url.trim()) {
      setToast({ message: 'Please enter a YouTube URL', type: 'error' });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setVideoInfo({
        title: 'Amazing Nature Documentary - 4K Ultra HD',
        thumbnail: 'https://picsum.photos/seed/nature/640/360',
        duration: '12:34',
        views: '2.5M',
        author: 'Nature Channel',
      });
      setIsLoading(false);
      setToast({ message: 'Video found! Select your format.', type: 'success' });
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setToast({ message: 'Download completed successfully!', type: 'success' });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      setToast({ message: 'Failed to paste from clipboard', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundParticles />
      <FloatingIcons />
      
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className="relative z-10 glass-strong border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
                  <Play className="w-7 h-7 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 blur opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">StreamSnap</h1>
                <p className="text-xs text-gray-400">Premium YouTube Downloader</p>
              </div>
            </motion.div>
            
            <nav className="hidden md:flex items-center gap-6">
              {['Features', 'Pricing', 'FAQ', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>
            
            <motion.button
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Premium
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-300">Premium Quality Downloads</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Download Any</span>
            <br />
            <span className="gradient-text">YouTube Video</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Convert and download YouTube videos in MP4, MP3, and more formats. 
            Lightning fast, completely free, and no registration required.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Lightning Fast</span>
            </motion.div>
            <motion.div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">100% Secure</span>
            </motion.div>
            <motion.div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Infinity className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Unlimited Downloads</span>
            </motion.div>
          </div>
        </motion.section>

        {/* URL Input Section */}
        <motion.section
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-strong p-2 rounded-3xl glow-purple">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste YouTube URL here..."
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleFetchVideo()}
                />
                {url && (
                  <button
                    onClick={() => setUrl('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <motion.button
                onClick={handlePaste}
                className="px-4 py-4 glass rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Copy className="w-5 h-5 text-purple-400" />
                <span className="hidden md:inline text-gray-300">Paste</span>
              </motion.button>
              
              <motion.button
                onClick={handleFetchVideo}
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-semibold text-white flex items-center gap-2 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Convert</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Video Info & Download Options */}
        <AnimatePresence>
          {videoInfo && (
            <motion.section
              className="max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <div className="glass-strong rounded-3xl overflow-hidden glow">
                <div className="md:flex">
                  {/* Thumbnail */}
                  <div className="md:w-1/2 relative group">
                    <img
                      src={videoInfo.thumbnail}
                      alt={videoInfo.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-sm text-white">
                        {videoInfo.duration}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info & Options */}
                  <div className="md:w-1/2 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{videoInfo.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {videoInfo.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {videoInfo.author}
                      </span>
                    </div>
                    
                    {/* Format Selection */}
                    <div className="mb-6">
                      <div className="flex gap-2 mb-4">
                        <motion.button
                          onClick={() => setSelectedFormat('MP4')}
                          className={cn(
                            "flex-1 py-3 rounded-xl font-semibold transition-all",
                            selectedFormat === 'MP4'
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : "glass text-gray-300 hover:bg-white/10"
                          )}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Video className="w-4 h-4" />
                            Video (MP4)
                          </div>
                        </motion.button>
                        <motion.button
                          onClick={() => setSelectedFormat('MP3')}
                          className={cn(
                            "flex-1 py-3 rounded-xl font-semibold transition-all",
                            selectedFormat === 'MP3'
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : "glass text-gray-300 hover:bg-white/10"
                          )}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Music className="w-4 h-4" />
                            Audio (MP3)
                          </div>
                        </motion.button>
                      </div>
                      
                      {/* Quality Options */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {(selectedFormat === 'MP4' ? videoFormats : audioFormats).map((fmt, idx) => (
                          <FormatCard
                            key={idx}
                            format={fmt.format}
                            quality={fmt.quality}
                            size={fmt.size}
                            isSelected={selectedQuality === fmt.quality}
                            onSelect={() => setSelectedQuality(fmt.quality)}
                            icon={fmt.icon}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Download Button */}
                    <motion.button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-white flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-6 h-6" />
                          <span>Download {selectedFormat} - {selectedQuality}</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Download Progress */}
        <AnimatePresence>
          {isDownloading && (
            <motion.section
              className="max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DownloadProgress
                progress={Math.min(downloadProgress, 100)}
                format={selectedFormat}
                quality={selectedQuality}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <StatsCard
              icon={Download}
              value="10M+"
              label="Downloads"
              color="bg-gradient-to-br from-purple-500 to-pink-500"
            />
            <StatsCard
              icon={Rocket}
              value="500K+"
              label="Users"
              color="bg-gradient-to-br from-cyan-500 to-blue-500"
            />
            <StatsCard
              icon={Award}
              value="4K"
              label="Max Quality"
              color="bg-gradient-to-br from-amber-500 to-orange-500"
            />
            <StatsCard
              icon={Zap}
              value="< 5s"
              label="Avg Speed"
              color="bg-gradient-to-br from-green-500 to-emerald-500"
            />
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="mb-16"
          id="features"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">StreamSnap</span>?
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The most advanced YouTube downloader with premium features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Download videos in seconds with our optimized servers and advanced compression technology."
              delay={0.8}
            />
            <FeatureCard
              icon={Diamond}
              title="4K Ultra HD"
              description="Support for all quality levels from 144p to stunning 4K Ultra HD resolution."
              delay={0.9}
            />
            <FeatureCard
              icon={Music}
              title="Multiple Formats"
              description="Convert to MP4, MP3, WEBM, and more. Extract audio with high-quality bitrates."
              delay={1.0}
            />
            <FeatureCard
              icon={Shield}
              title="100% Secure"
              description="No malware, no ads, no tracking. Your privacy is our top priority."
              delay={1.1}
            />
            <FeatureCard
              icon={Layers}
              title="Batch Download"
              description="Download entire playlists and channels with a single click."
              delay={1.2}
            />
            <FeatureCard
              icon={Cpu}
              title="Cross Platform"
              description="Works on Windows, Mac, Linux, Android, and iOS. Browser-based, no installation needed."
              delay={1.3}
            />
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Download videos in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', icon: Search, title: 'Paste URL', desc: 'Copy and paste any YouTube video URL' },
              { step: '2', icon: Sliders, title: 'Choose Format', desc: 'Select your preferred quality and format' },
              { step: '3', icon: Download, title: 'Download', desc: 'Click download and get your file instantly' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
              >
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
                    <span className="font-bold text-black">{item.step}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
        >
          <div className="glass-strong rounded-3xl p-12 text-center glow-purple relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10" />
            
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
              Ready to Start Downloading?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative">
              Join millions of users who trust StreamSnap for their video downloads.
              Fast, free, and unlimited!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-white flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-5 h-5" />
                Start Downloading Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 glass rounded-2xl font-semibold text-white flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-5 h-5 text-amber-400" />
                View Premium Features
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-strong border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
                <span className="text-xl font-bold gradient-text">StreamSnap</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate YouTube downloader with premium features and lightning-fast speeds.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'API', 'Blog'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'FAQ'] },
              { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'DMCA'] },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 StreamSnap. All rights reserved. Made with ❤️ for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
