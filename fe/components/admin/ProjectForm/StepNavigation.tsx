
import React from 'react';

interface StepNavigationProps {
  currentStep: number;
  maxSteps: number;
}

export default function StepNavigation({ currentStep, maxSteps }: StepNavigationProps) {
  return (
    <>
      {/* Progress Steps */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep >= step
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div
                className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                  currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-center space-x-8 text-sm text-gray-600 mb-8">
        <span className={currentStep === 1 ? 'font-medium text-indigo-600' : ''}>
          Info Dasar
        </span>
        <span className={currentStep === 2 ? 'font-medium text-indigo-600' : ''}>
          Media
        </span>
        <span className={currentStep === 3 ? 'font-medium text-indigo-600' : ''}>
          Konten
        </span>
        <span className={currentStep === 4 ? 'font-medium text-indigo-600' : ''}>
          Detail
        </span>
      </div>
    </>
  );
}
