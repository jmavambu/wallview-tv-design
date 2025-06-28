
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star } from 'lucide-react';
import { TVDemo3D } from './TVDemo3D';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Professional TV Wall
              <span className="text-blue-600"> Mounting Service</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your space with expert TV installation. See exactly how your TV will look before we mount it.
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              'Expert installation by certified technicians',
              'Compatible with all TV brands and sizes',
              'Same-day and next-day appointments available',
              'Full insurance and 1-year warranty included'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">4.9/5 from 500+ customers</span>
          </div>
          
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Your Project
          </Button>
        </div>
        
        <div className="lg:pl-8">
          <TVDemo3D />
        </div>
      </div>
    </div>
  );
};
