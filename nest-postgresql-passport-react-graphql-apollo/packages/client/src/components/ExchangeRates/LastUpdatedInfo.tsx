import React, { useEffect, useState } from 'react';
import {
  formatDistance,
  parseISO,
  isValid,
  format,
  isFuture,
  differenceInMilliseconds,
} from 'date-fns';

interface LastUpdatedInfoProps {
  lastUpdated: string;
}

const LastUpdatedInfo: React.FC<LastUpdatedInfoProps> = ({ lastUpdated }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');
  const [exactTime, setExactTime] = useState<string>('');

  useEffect(() => {
    const calculateTimeInfo = () => {
      const parsedDate = parseISO(lastUpdated);

      if (!isValid(parsedDate)) {
        setTimeAgo('just now');
        setExactTime('Unknown');
        return;
      }

      setExactTime(format(parsedDate, 'yyyy-MM-dd HH:mm:ss (xxx)'));

      const now = new Date();

      if (isFuture(parsedDate)) {
        setTimeAgo('just now');
        return;
      }

      const diffInMilliseconds = differenceInMilliseconds(now, parsedDate);

      if (diffInMilliseconds < 5000) {
        setTimeAgo('just now');
        return;
      }


      setTimeAgo(formatDistance(parsedDate, now, { addSuffix: true }));
    };

    calculateTimeInfo();

    const intervalId = setInterval(calculateTimeInfo, 1000 * 10);

    return () => clearInterval(intervalId);
  }, [lastUpdated]);

  return (
    <div className="last-updated-info">
      <p>
        Exchange rates last updated: <strong>{timeAgo}</strong>
        <br />
        <small>Exact time: {exactTime}</small>
      </p>
    </div>
  );
};

export default LastUpdatedInfo;