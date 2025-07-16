import { BookOpen, Stethoscope, CheckCircle } from 'lucide-react';

export default function FeatureCard({ title, features, isMedical = false }) {
  const Icon = isMedical ? Stethoscope : BookOpen;
  const colors = isMedical 
    ? { icon: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' }
    : { icon: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' };

  return (
    <div className={`rounded-xl shadow-lg p-6 border ${colors.border} ${colors.bg} hover:shadow-2xl transition-shadow duration-300`}>
      <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
        <Icon className={`w-7 h-7 mr-3 ${colors.icon}`} />
        {title}
      </h3>
      <ul className="space-y-3 text-gray-700">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className={`w-5 h-5 mr-2 mt-1 flex-shrink-0 ${colors.icon}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 