import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Publication {
  id: number;
  title: string;
  summary: string;
  author_name: string;
  position?: string;
  institution?: string;
  category: string;
  views_count: number;
  published_at: string;
}

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow hover-scale">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl leading-tight">
            {publication.title}
          </CardTitle>
          <Badge variant="secondary">{publication.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3">
          {publication.summary}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
          <div>
            <p className="font-medium text-foreground">{publication.author_name}</p>
            {publication.position && (
              <p className="text-xs">{publication.position}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={16} />
              <span>{publication.views_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={16} />
              <span>{formatDate(publication.published_at)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
