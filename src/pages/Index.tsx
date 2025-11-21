import { useState, useEffect } from 'react';
import Header from '../components/Header';
import AuthDialog from '../components/AuthDialog';
import PublicationCard from '../components/PublicationCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Icon from '../components/ui/icon';

const Index = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [sessionToken, setSessionToken] = useState<string>('');
  const [publications, setPublications] = useState<any[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('sessionToken');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setSessionToken(savedToken);
    }

    loadPublications();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPublications = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c15bafbf-1024-4c0f-be79-1cd4e4ae952c');
      const data = await response.json();
      setPublications(data.publications || []);
    } catch (err) {
      console.error('Failed to load publications', err);
    }
  };

  const handleAuth = (userData: any, token: string) => {
    setUser(userData);
    setSessionToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('sessionToken', token);
  };

  const handleLogout = () => {
    setUser(null);
    setSessionToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionToken');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div 
        className="fixed inset-0 mesh-gradient pointer-events-none" 
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div className="relative z-10">
      <Header 
        onAuthClick={() => setAuthDialogOpen(true)} 
        user={user} 
        onLogout={handleLogout}
      />

      <section id="home" className="py-20 animated-gradient relative">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              Платформа для обмена педагогическими идеями
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Публикуйте свой опыт, делитесь методиками, создавайте индивидуальные образовательные маршруты
            </p>
            <div className="flex gap-4 justify-center pt-6">
              <Button size="lg" onClick={() => !user && setAuthDialogOpen(true)}>
                {user ? 'Создать публикацию' : 'Присоединиться'}
              </Button>
              <Button size="lg" variant="outline">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            style={{ 
              transform: `translateY(${Math.max(0, (scrollY - 400) * 0.1)}px)`,
              opacity: Math.min(1, 1 - (scrollY - 400) * 0.0005)
            }}
          >
            <Card className="text-center hover-scale">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                </div>
                <CardTitle>Публикации</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Делитесь своими методиками и находите вдохновение в работах коллег
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Map" size={24} className="text-primary" />
                </div>
                <CardTitle>ИОМ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Создавайте индивидуальные образовательные маршруты для учащихся
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <CardTitle>Сообщество</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Объединяйтесь с педагогами по всей стране для обмена опытом
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="publications" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Последние публикации</h2>
              {user && (
                <Button>
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить публикацию
                </Button>
              )}
            </div>

            {publications.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {publications.map((pub) => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Пока нет публикаций. Станьте первым!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section id="iom" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Индивидуальные образовательные маршруты</h2>
            
            <Card>
              <CardContent className="py-12 text-center">
                <Icon name="Map" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Раздел находится в разработке
                </p>
                <Button variant="outline" disabled>
                  Скоро появится
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Свяжитесь с нами</h2>
            <p className="text-lg opacity-90">
              Есть вопросы или предложения? Мы всегда рады обратной связи!
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button variant="secondary" size="lg">
                <Icon name="Mail" size={20} className="mr-2" />
                info@pedidei.ru
              </Button>
              <Button variant="secondary" size="lg">
                <Icon name="Phone" size={20} className="mr-2" />
                +7 (495) 123-45-67
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-muted/50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ПедИдеи. Платформа для обмена педагогическими идеями</p>
          </div>
        </div>
      </footer>

      <AuthDialog 
        open={authDialogOpen} 
        onClose={() => setAuthDialogOpen(false)}
        onAuth={handleAuth}
      />
      </div>
    </div>
  );
};

export default Index;