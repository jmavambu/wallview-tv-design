
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { AppointmentData, TVConfig } from '@/pages/Index';

interface AppointmentBookingProps {
  data: AppointmentData;
  onDataChange: (data: AppointmentData) => void;
  tvConfig: TVConfig;
  onNext: () => void;
  onBack: () => void;
}

export const AppointmentBooking = ({ data, onDataChange, tvConfig, onNext, onBack }: AppointmentBookingProps) => {
  const [selectedDate, setSelectedDate] = useState(data.date);
  const [selectedTime, setSelectedTime] = useState(data.time);

  // Generate available dates (next 14 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (day 0)
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    return dates;
  };

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  const handleContinue = () => {
    onDataChange({
      ...data,
      date: selectedDate,
      time: selectedTime
    });
    onNext();
  };

  const isFormValid = () => {
    return selectedDate && selectedTime && data.name && data.address && data.phone;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Schedule Your Appointment</h2>
          <p className="text-gray-600">Choose your preferred date and time for professional TV installation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Select Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getAvailableDates().map((date) => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        selectedDate === date.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-medium">{date.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Select Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        selectedTime === time
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{time}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Contact & Address Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => onDataChange({ ...data, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => onDataChange({ ...data, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Installation Address *</Label>
                  <Input
                    id="address"
                    value={data.address}
                    onChange={(e) => onDataChange({ ...data, address: e.target.value })}
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => onDataChange({ ...data, notes: e.target.value })}
                    placeholder="Apartment/gate code, parking instructions, wall type, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointment Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">TV Setup</div>
                  <div className="font-medium">{tvConfig.size}" TV</div>
                  <div className="text-sm text-gray-600">
                    {tvConfig.customMount ? 'Customer Mount' : `${tvConfig.wallMount} mount`}
                  </div>
                </div>
                
                {selectedDate && (
                  <div>
                    <div className="text-sm text-gray-600">Date</div>
                    <div className="font-medium">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                )}
                
                {selectedTime && (
                  <div>
                    <div className="text-sm text-gray-600">Time</div>
                    <div className="font-medium">{selectedTime}</div>
                  </div>
                )}
                
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <h4 className="font-medium mb-2">What to expect:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Professional installation (2-3 hours)</li>
                    <li>• All necessary hardware included</li>
                    <li>• Cable management and cleanup</li>
                    <li>• Final testing and demonstration</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm">
                  <h4 className="font-medium mb-2">Cancellation Policy:</h4>
                  <p className="text-gray-700">
                    Free cancellation up to 24 hours before appointment. 
                    Late cancellations may incur a $50 fee.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleContinue} 
                disabled={!isFormValid()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
