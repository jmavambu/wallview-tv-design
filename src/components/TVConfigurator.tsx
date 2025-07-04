
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { TVConfig } from '@/pages/Index';

interface TVConfiguratorProps {
  config: TVConfig;
  onConfigChange: (config: TVConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

const TV_SIZES = [
  { size: '32', price: 99, weight: '15-20 lbs' },
  { size: '40', price: 119, weight: '18-25 lbs' },
  { size: '43', price: 129, weight: '20-30 lbs' },
  { size: '50', price: 139, weight: '25-35 lbs' },
  { size: '55', price: 149, weight: '30-40 lbs' },
  { size: '60', price: 159, weight: '35-45 lbs' },
  { size: '65', price: 179, weight: '40-55 lbs' },
  { size: '70', price: 189, weight: '50-65 lbs' },
  { size: '75', price: 199, weight: '55-70 lbs' },
  { size: '77', price: 209, weight: '60-75 lbs' },
  { size: '82', price: 229, weight: '65-80 lbs' },
  { size: '85', price: 249, weight: '70-90 lbs' }
];

const WALL_MOUNTS = [
  {
    type: 'fixed',
    name: 'Fixed Mount',
    price: 49,
    description: 'Keeps TV flat against wall',
    maxSize: 85,
    maxWeight: 100
  },
  {
    type: 'tilting',
    name: 'Tilting Mount',
    price: 79,
    description: 'Allows up/down angle adjustment',
    maxSize: 75,
    maxWeight: 80
  },
  {
    type: 'articulating',
    name: 'Full Motion Mount',
    price: 119,
    description: 'Complete movement and rotation',
    maxSize: 65,
    maxWeight: 60
  }
];

const WALL_TYPES = [
  {
    type: 'drywall',
    name: '🏠 Drywall',
    description: 'Standard wall',
    additionalFee: 0,
    note: 'Most common wall type'
  },
  {
    type: 'brick',
    name: '🧱 Brick/Stone',
    description: 'Masonry wall',
    additionalFee: 50,
    note: 'Requires masonry drill bits'
  },
  {
    type: 'concrete',
    name: '🏗️ Concrete',
    description: 'Concrete wall',
    additionalFee: 75,
    note: 'Requires special drilling equipment'
  }
];

export const TVConfigurator = ({ config, onConfigChange, onNext, onBack }: TVConfiguratorProps) => {
  const [selectedTVSize, setSelectedTVSize] = useState(config.size);
  const [selectedMount, setSelectedMount] = useState(config.wallMount);
  const [customMount, setCustomMount] = useState(config.customMount);
  const [selectedWallType, setSelectedWallType] = useState(config.wallType);

  const getCompatibleMounts = () => {
    const tvSize = parseInt(selectedTVSize);
    return WALL_MOUNTS.filter(mount => mount.maxSize >= tvSize);
  };

  const getRecommendedMount = () => {
    const tvSize = parseInt(selectedTVSize);
    if (tvSize <= 43) return 'fixed';
    if (tvSize <= 65) return 'tilting';
    return 'articulating';
  };

  const handleContinue = () => {
    const tvSizeData = TV_SIZES.find(tv => tv.size === selectedTVSize);
    const mountData = WALL_MOUNTS.find(mount => mount.type === selectedMount);
    
    onConfigChange({
      size: selectedTVSize,
      brand: config.brand,
      wallMount: selectedMount,
      customMount,
      wallType: selectedWallType
    });
    onNext();
  };

  const selectedTVData = TV_SIZES.find(tv => tv.size === selectedTVSize);
  const selectedMountData = WALL_MOUNTS.find(mount => mount.type === selectedMount);
  const selectedWallTypeData = WALL_TYPES.find(wall => wall.type === selectedWallType);
  const wallTypeFee = selectedWallTypeData?.additionalFee || 0;
  const totalPrice = (selectedTVData?.price || 0) + (customMount ? 0 : selectedMountData?.price || 0) + wallTypeFee;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Configure Your TV Setup</h2>
          <p className="text-gray-600">Choose your TV size, mounting option, and wall type for the perfect installation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* TV Size Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Select TV Size</span>
                  <Badge variant="secondary">Required</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedTVSize} onValueChange={setSelectedTVSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select TV size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    {TV_SIZES.map((tv) => (
                      <SelectItem key={tv.size} value={tv.size}>
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium">{tv.size}" TV</span>
                          <div className="text-sm text-gray-600 ml-4">
                            {tv.weight} • ${tv.price}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTVData && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <strong>{selectedTVData.size}" TV</strong> • Weight: {selectedTVData.weight} • Installation: ${selectedTVData.price}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Wall Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Wall Type</span>
                  <Badge variant="secondary">Required</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {WALL_TYPES.map((wall) => (
                    <button
                      key={wall.type}
                      onClick={() => setSelectedWallType(wall.type)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                        selectedWallType === wall.type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold">{wall.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{wall.description}</div>
                          <div className="text-xs text-blue-600 mt-1 flex items-center">
                            <Info className="h-3 w-3 mr-1" />
                            {wall.note}
                          </div>
                        </div>
                        <div className="text-right">
                          {wall.additionalFee > 0 ? (
                            <div className="text-sm font-medium text-orange-600">+${wall.additionalFee}</div>
                          ) : (
                            <div className="text-sm text-green-600">Included</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wall Mount Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Wall Mount Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={customMount}
                      onChange={(e) => setCustomMount(e.target.checked)}
                      className="rounded"
                    />
                    <span>I'll provide my own wall mount</span>
                  </label>
                </div>

                {!customMount && (
                  <div className="space-y-4">
                    {getCompatibleMounts().map((mount) => (
                      <button
                        key={mount.type}
                        onClick={() => setSelectedMount(mount.type)}
                        className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                          selectedMount === mount.type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold flex items-center space-x-2">
                              <span>{mount.name}</span>
                              {mount.type === getRecommendedMount() && (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{mount.description}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Max size: {mount.maxSize}" • Max weight: {mount.maxWeight} lbs
                            </div>
                          </div>
                          <div className="text-lg font-bold text-green-600">${mount.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>TV Size:</span>
                  <span className="font-medium">{selectedTVSize}"</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Wall Type:</span>
                  <span className="font-medium">{selectedWallTypeData?.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Installation:</span>
                  <span className="font-medium">${selectedTVData?.price}</span>
                </div>
                
                {wallTypeFee > 0 && (
                  <div className="flex justify-between">
                    <span>Wall Type Fee:</span>
                    <span className="font-medium">${wallTypeFee}</span>
                  </div>
                )}
                
                {!customMount && (
                  <div className="flex justify-between">
                    <span>Wall Mount:</span>
                    <span className="font-medium">${selectedMountData?.price}</span>
                  </div>
                )}
                
                {customMount && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-4 w-4 inline mr-2" />
                    Bringing your own mount saves ${selectedMountData?.price}
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
                
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  Includes installation, hardware, and 1-year warranty
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleContinue} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
