import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  onAuth: (user: any, token: string) => void;
}

export default function AuthDialog({ open, onClose, onAuth }: AuthDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://functions.poehali.dev/1b63b552-fa9a-4203-9bbf-a698600faf40', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          email: formData.get('email'),
          password: formData.get('password'),
          full_name: formData.get('full_name')
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        onAuth(data.user, data.session_token);
        onClose();
      } else {
        setError(data.error || 'Ошибка регистрации');
      }
    } catch (err) {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://functions.poehali.dev/1b63b552-fa9a-4203-9bbf-a698600faf40', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          email: formData.get('email'),
          password: formData.get('password')
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        onAuth(data.user, data.session_token);
        onClose();
      } else {
        setError(data.error || 'Неверные данные');
      }
    } catch (err) {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вход в систему</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Войти</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="pedagog@example.com"
                />
              </div>
              <div>
                <Label htmlFor="login-password">Пароль</Label>
                <Input 
                  id="login-password" 
                  name="password" 
                  type="password" 
                  required 
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-name">ФИО</Label>
                <Input 
                  id="register-name" 
                  name="full_name" 
                  required 
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="pedagog@example.com"
                />
              </div>
              <div>
                <Label htmlFor="register-password">Пароль</Label>
                <Input 
                  id="register-password" 
                  name="password" 
                  type="password" 
                  required 
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
