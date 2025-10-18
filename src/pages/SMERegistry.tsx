import React from 'react';
import { SMERegistryForm } from '@/components/SMERegistryForm';

const SMERegistry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Register Your SME
              </span>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              SME Registry
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join our network and connect your business with digital experts and new opportunities. Register your SME by filling out the form below.
            </p>
          </div>

          {/* Form Section */}
          <SMERegistryForm />
        </div>
      </div>
    </div>
  );
};

export default SMERegistry;
