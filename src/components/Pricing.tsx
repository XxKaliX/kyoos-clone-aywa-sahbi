
import { Check, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('basic_plan'),
      price: '$29',
      period: t('month'),
      description: 'Perfect for individuals getting started',
      features: [
        'Basic penetration testing tools',
        'Email support',
        'Standard documentation',
        '5 vulnerability scans per month',
        'Basic reporting'
      ],
      popular: false,
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      name: t('gold_plan'),
      price: '$79',
      period: t('month'),
      description: 'Best for professional security teams',
      features: [
        'Advanced penetration testing suite',
        'Priority support',
        'Comprehensive documentation',
        'Unlimited vulnerability scans',
        'Advanced reporting & analytics',
        'Custom integrations',
        'Team collaboration tools'
      ],
      popular: true,
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      name: t('diamond_plan'),
      price: '$199',
      period: t('month'),
      description: 'Enterprise-grade security solutions',
      features: [
        'Complete cybersecurity arsenal',
        'Dedicated support manager',
        'White-label solutions',
        'Custom tool development',
        'Advanced threat intelligence',
        'Compliance reporting',
        'On-site training',
        'API access'
      ],
      popular: false,
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t('pricing_title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('pricing_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-900/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular 
                  ? 'border-yellow-500/50 ring-2 ring-yellow-500/20' 
                  : 'border-slate-700 hover:border-blue-500/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 mb-2">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient} bg-opacity-20 mt-0.5`}>
                      <Check className={`w-4 h-4 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                plan.popular
                  ? `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90 hover:transform hover:scale-105`
                  : `border-2 border-slate-600 text-white hover:bg-gradient-to-r hover:${plan.gradient} hover:border-transparent`
              }`}>
                {t('choose_plan')}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">All plans include 30-day money-back guarantee</p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
