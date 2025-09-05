import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Building2 } from 'lucide-react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  salary: string;
  description: string;
  tags: string[];
  postedTime: string;
}

export const JobCard = ({ title, company, location, type, salary, description, tags, postedTime }: JobCardProps) => {
  return (
    <Card className="card-hover shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors cursor-pointer">
              {title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Building2 className="h-4 w-4" />
                <span>{company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-success font-medium">
              <DollarSign className="h-4 w-4" />
              <span>{salary}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{postedTime}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button size="sm" className="flex-1">
              Apply Now
            </Button>
            <Button variant="outline" size="sm">
              Save Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};