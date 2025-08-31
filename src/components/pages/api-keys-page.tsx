"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { KeyRound, Save, ShieldAlert, Trash2 } from 'lucide-react';

type ApiKey = {
  service: string;
  key: string;
  lastFour: string;
};

const SUPPORTED_SERVICES = [
    { id: 'google-ai', name: 'Google AI' },
    { id: 'openai', name: 'OpenAI' },
    { id: 'deepseek', name: 'DeepSeek' },
];

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load keys from localStorage on mount
    try {
      const savedKeys = localStorage.getItem('apiKeys');
      if (savedKeys) {
        setApiKeys(JSON.parse(savedKeys));
      }
    } catch (error) {
      console.error("Failed to load API keys from localStorage", error);
    }
  }, []);

  const saveApiKeys = (keys: ApiKey[]) => {
    try {
      localStorage.setItem('apiKeys', JSON.stringify(keys));
      setApiKeys(keys);
    } catch (error) {
      console.error("Failed to save API keys to localStorage", error);
    }
  };

  const handleSaveKey = () => {
    if (!selectedService || !apiKeyInput) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select a service and provide an API key.',
      });
      return;
    }

    const lastFour = apiKeyInput.slice(-4);
    const newKey = { service: selectedService, key: apiKeyInput, lastFour };

    const existingKeys = apiKeys.filter(k => k.service !== selectedService);
    const updatedKeys = [...existingKeys, newKey];
    
    saveApiKeys(updatedKeys);

    toast({
      title: 'API Key Saved',
      description: `Your key for ${SUPPORTED_SERVICES.find(s => s.id === selectedService)?.name} has been saved.`,
    });

    // Clear inputs
    setSelectedService('');
    setApiKeyInput('');
  };

  const handleRemoveKey = (serviceId: string) => {
    const updatedKeys = apiKeys.filter(k => k.service !== serviceId);
    saveApiKeys(updatedKeys);
    toast({
      title: 'API Key Removed',
      description: `Your key for ${SUPPORTED_SERVICES.find(s => s.id === serviceId)?.name} has been removed.`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight font-headline">API Keys</h1>
        <p className="text-muted-foreground mt-2">
          Securely manage your API keys for various AI model providers.
        </p>
      </div>

      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          For this prototype, keys are stored in your browser's local storage. In a real-world application, keys must be encrypted and stored securely on the server-side.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Add New API Key</CardTitle>
          <CardDescription>Select a service and enter your API key below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-select">AI Service</Label>
            <Select onValueChange={setSelectedService} value={selectedService}>
              <SelectTrigger id="service-select">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_SERVICES.map(service => (
                  <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key-input">API Key</Label>
            <Input 
              id="api-key-input" 
              type="password" 
              placeholder="Enter your API key" 
              value={apiKeyInput} 
              onChange={e => setApiKeyInput(e.target.value)} 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveKey}>
            <Save className="mr-2 h-4 w-4" />
            Save Key
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Keys</CardTitle>
          <CardDescription>Your currently configured API keys.</CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length > 0 ? (
            <div className="space-y-3">
              {apiKeys.map(key => (
                <div key={key.service} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <KeyRound className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{SUPPORTED_SERVICES.find(s => s.id === key.service)?.name}</p>
                      <p className="text-sm text-muted-foreground font-mono">**** **** **** {key.lastFour}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveKey(key.service)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove key</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">You haven't saved any API keys yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
