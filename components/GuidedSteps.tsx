
import React from 'react';

interface GuidedStepsProps {
  title: string;
  steps: string[];
}

const GuidedSteps: React.FC<GuidedStepsProps> = ({ title, steps }) => {
  return (
    <div className="mt-3 border-t border-gray-300 pt-3">
      <h4 className="font-bold text-md mb-2 text-gray-800">{title}</h4>
      <ol className="list-decimal list-inside space-y-2 text-sm">
        {steps.map((step, index) => (
          <li key={index} className="text-gray-700">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GuidedSteps;
