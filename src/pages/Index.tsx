import React, { useState } from 'react';
import { TVConfigurator } from '@/components/TVConfigurator';
import { AppointmentBooking } from '@/components/AppointmentBooking';
import { PaymentOptions } from '@/components/PaymentOptions';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { toast } from 'sonner';

export interface TVConfig {
  size: string;
  brand: string;
  wallMount: string;
  customMount: boolean;
  wallType: string;
}

export interface AppointmentData {
  date: string;
  time: string;
  address: string;
  phone: string;
  name: string;
  notes: string;
}

export interface PaymentData {
  type: 'full' | 'downpayment';
  amount: number;
  totalAmount: number;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tvConfig, setTvConfig] = useState<TVConfig>({
    size: '55',
    brand: 'Samsung',
    wallMount: 'tilting',
    customMount: false,
    wallType: 'drywall'
  });
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    date: '',
    time: '',
    address: '',
    phone: '',
    name: '',
    notes: ''
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    type: 'downpayment',
    amount: 0,
    totalAmount: 0
  });

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookingComplete = () => {
    toast.success('Booking confirmed! We\'ll contact you within 24 hours to confirm your appointment.');
    // Reset form
    setCurrentStep(1);
    setTvConfig({
      size: '55',
      brand: 'Samsung',
      wallMount: 'tilting',
      customMount: false,
      wallType: 'drywall'
    });
    setAppointmentData({
      date: '',
      time: '',
      address: '',
      phone: '',
      name: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {currentStep === 1 && (
        <Hero onGetStarted={handleNextStep} />
      )}
      
      {currentStep === 2 && (
        <TVConfigurator
          config={tvConfig}
          onConfigChange={setTvConfig}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
      )}
      
      {currentStep === 3 && (
        <AppointmentBooking
          data={appointmentData}
          onDataChange={setAppointmentData}
          tvConfig={tvConfig}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
      )}
      
      {currentStep === 4 && (
        <PaymentOptions
          appointmentData={appointmentData}
          tvConfig={tvConfig}
          paymentData={paymentData}
          onPaymentChange={setPaymentData}
          onComplete={handleBookingComplete}
          onBack={handlePrevStep}
        />
      )}
      
      {/* Progress Indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-full px-6 py-2 shadow-lg border">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-8 h-1 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
