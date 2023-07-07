
export const timeSince = (date: string) => {
    const baseDate = new Date(date);
    const seconds = Math.floor((new Date().getTime() - baseDate.getTime()) / 1000);
    
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];
  
    const interval = intervals.find(int => seconds / int.seconds >= 1);
    
    if(interval) {
      const count = Math.floor(seconds / interval.seconds);
      return `${count} ${interval.label}${count > 1 ? 's' : ''}`;
    }
  
    return 'Just now';
  };
  