
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { AppointmentData, TVConfig, PaymentData } from '@/pages/Index';

interface PaymentOptionsProps {
  appointmentData: AppointmentData;
  tvConfig: TVConfig;
  paymentData: PaymentData;
  onPaymentChange: (data: PaymentData) => void;
  onComplete: () => void;
  onBack: () => void;
}

export const PaymentOptions = ({ 
  appointmentData, 
  tvConfig, 
  paymentData, 
  onPaymentChange, 
  onComplete, 
  onBack 
}: PaymentOptionsProps) => {
  const [paymentType, setPaymentType] = useState<'full' | 'downpayment'>('downpayment');

  // Calculate pricing
  const TV_PRICES = {
    '32': 99, '43': 129, '55': 149, 
    '65': 179, '75': 199, '85': 249
  };

  const MOUNT_PRICES = {
    'fixed': 49, 'tilting': 79, 'articulating': 119
  };

  const installationPrice = TV_PRICES[tvConfig.size as keyof typeof TV_PRICES] || 149;
  const mountPrice = tvConfig.customMount ? 0 : (MOUNT_PRICES[tvConfig.wallMount as keyof typeof MOUNT_PRICES] || 79);
  const totalAmount = installationPrice + mountPrice;
  const downPaymentAmount = Math.ceil(totalAmount * 0.25);
  const remainingAmount = totalAmount - downPaymentAmount;

  const handlePaymentTypeChange = (type: 'full' | 'downpayment') => {
    setPaymentType(type);
    onPaymentChange({
      type,
      amount: type === 'full' ? totalAmount : downPaymentAmount,
      totalAmount
    });
  };

  const handleBookNow = () => {
    // In a real app, this would integrate with a payment processor
    onComplete();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment & Confirmation</h2>
          <p className="text-gray-600">Choose your payment option and confirm your booking</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={paymentType} 
                  onValueChange={(value) => handlePaymentTypeChange(value as 'full' | 'downpayment')}
                  className="space-y-4"
                >
                  {/* Down Payment Option */}
                  <div className="flex items-start space-x-3 p-4 border-2 rounded-lg border-blue-200 bg-blue-50">
                    <RadioGroupItem value="downpayment" id="downpayment" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="downpayment" className="text-base font-medium flex items-center space-x-2">
                        <span>25% Down Payment</span>
                        <Badge className="bg-blue-600">Recommended</Badge>
                      </Label>
                      <div className="mt-2 space-y-2">
                        <div className="text-2xl font-bold text-green-600">${downPaymentAmount}</div>
                        <div className="text-sm text-gray-600">
                          Pay ${downPaymentAmount} today, ${remainingAmount} after installation
                        </div>
                        <div className="flex items-start space-x-2 text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
                          <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">Benefits:</div>
                            <ul className="mt-1 space-y-1">
                              <li>• Secure your appointment slot</li>
                              <li>• Pay remaining balance after job completion</li>
                              <li>• Free cancellation up to 24 hours before</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full Payment Option */}
                  <div className="flex items-start space-x-3 p-4 border-2 rounded-lg border-gray-200">
                    <RadioGroupItem value="full" id="full" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="full" className="text-base font-medium">
                        Full Payment
                      </Label>
                      <div className="mt-2 space-y-2">
                        <div className="text-2xl font-bold text-green-600">${totalAmount}</div>
                        <div className="text-sm text-gray-600">
                          Pay the full amount today
                        </div>
                        <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                          Save on processing fees • Complete payment today
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Important Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Cancellation Policy</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Free cancellation up to 24 hours before scheduled appointment</li>
                    <li>• Cancellations within 24 hours may incur a $50 processing fee</li>
                    <li>• No-shows will be charged the full down payment amount</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Additional Charges</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Drywall repair (if needed): $25-75</li>
                    <li>• Fish wire through walls: $50 per wall</li>
                    <li>• Brick/concrete drilling: $25 extra</li>
                    <li>• Same-day service: +$50</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">What's Included</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Professional installation by certified technicians</li>
                    <li>• All standard mounting hardware</li>
                    <li>• Cable management and organization</li>
                    <li>• 1-year installation warranty</li>
                    <li>• Cleanup and debris removal</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">{appointmentData.name}</div>
                  <div className="text-sm text-gray-600">{appointmentData.phone}</div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm text-gray-600">Service Date</div>
                  <div className="font-medium">
                    {new Date(appointmentData.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-600">{appointmentData.time}</div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm text-gray-600">Service Details</div>
                  <div className="font-medium">{tvConfig.size}" TV Installation</div>
                  <div className="text-sm text-gray-600">
                    {tvConfig.customMount ? 'Customer-provided mount' : `${tvConfig.wallMount} wall mount`}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Installation:</span>
                    <span>${installationPrice}</span>
                  </div>
                  {!tvConfig.customMount && (
                    <div className="flex justify-between">
                      <span>Wall Mount:</span>
                      <span>${mountPrice}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${totalAmount}</span>
                  </div>
                  {paymentType === 'downpayment' && (
                    <>
                      <div className="flex justify-between text-blue-600">
                        <span>Paying Today:</span>
                        <span>${downPaymentAmount}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Due After Service:</span>
                        <span>${remainingAmount}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleBookNow}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              By booking, you agree to our terms of service and cancellation policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
