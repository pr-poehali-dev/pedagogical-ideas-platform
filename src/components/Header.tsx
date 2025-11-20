import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface HeaderProps {
  onAuthClick: () => void;
  user: any;
  onLogout: () => void;
}

export default function Header({ onAuthClick, user, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-2xl font-bold text-primary">
              ПедИдеи
            </a>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">
                Главная
              </a>
              <a href="#publications" className="text-foreground hover:text-primary transition-colors">
                Публикации
              </a>
              <a href="#iom" className="text-foreground hover:text-primary transition-colors">
                ИОМ
              </a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">
                Контакты
              </a>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.full_name}
                </span>
                <Button variant="outline" onClick={onLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <Button onClick={onAuthClick}>
                Войти
              </Button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-foreground hover:text-primary transition-colors py-2">
                Главная
              </a>
              <a href="#publications" className="text-foreground hover:text-primary transition-colors py-2">
                Публикации
              </a>
              <a href="#iom" className="text-foreground hover:text-primary transition-colors py-2">
                ИОМ
              </a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors py-2">
                Контакты
              </a>
              {user ? (
                <Button variant="outline" onClick={onLogout} className="w-full">
                  Выйти
                </Button>
              ) : (
                <Button onClick={onAuthClick} className="w-full">
                  Войти
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
