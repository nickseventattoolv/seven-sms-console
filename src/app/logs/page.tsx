'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type LogEntry = {
  id: number;
  phone: string;
  message: string;
  type: string;
  status: 'Sent' | 'Failed' | 'Pending';
  date: string;
};

const mockData: LogEntry[] = [
  {
    id: 1,
    phone: '+1 (555) 123-4567',
    message: 'Appointment reminder: Tomorrow at 3PM.',
    type: 'Reminder',
    status: 'Sent',
    date: '2025-04-10 14:32',
  },
  {
    id: 2,
    phone: '+1 (555) 987-6543',
    message: 'Follow-up: Hope you loved your tattoo!',
    type: 'Follow-Up',
    status: 'Pending',
    date: '2025-04-10 15:21',
  },
  {
    id: 3,
    phone: '+1 (555) 222-3333',
    message: 'Promo: 10% off this week only.',
    type: 'Promotion',
    status: 'Failed',
    date: '2025-04-10 13:15',
  },
];

export default function LogsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string | null>(null);

  const filteredLogs = mockData.filter((log) => {
    return (
      (!filter || log.type === filter) &&
      (log.phone.toLowerCase().includes(search.toLowerCase()) ||
        log.message.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const getStatusColor = (status: LogEntry['status']) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-600 text-white';
      case 'Failed':
        return 'bg-red-600 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-black';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">📄 Message Logs</h1>

        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search phone or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[250px]"
          />
          <Select onValueChange={(value) => setFilter(value)} defaultValue="">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="Reminder">Reminder</SelectItem>
              <SelectItem value="Follow-Up">Follow-Up</SelectItem>
              <SelectItem value="Promotion">Promotion</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Message</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t border-border hover:bg-muted/30">
                  <td className="py-2 pr-4">{log.phone}</td>
                  <td className="py-2 pr-4">{log.message}</td>
                  <td className="py-2 pr-4">{log.type}</td>
                  <td className="py-2 pr-4">
                    <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                  </td>
                  <td className="py-2 pr-4">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

