
import { Shield, Zap, Target, Lock, Database, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('feature_1_title'),
      description: t('feature_1_desc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lock,
      title: t('feature_2_title'),
      description: t('feature_2_desc'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: t('feature_3_title'),
      description: t('feature_3_desc'),
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-20 bg-slate-800/50" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t('features_title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('features_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-10`}>
                  <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Real-time Monitoring</h3>
            </div>
            <p className="text-gray-400">
              Monitor your systems in real-time with advanced threat detection and automated response capabilities.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Global Network</h3>
            </div>
            <p className="text-gray-400">
              Access our global network of security resources and threat intelligence from anywhere in the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
