import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyConnections, requestConnection } from '@/lib/api/connections';

export function useConnections() {
    return useQuery({
        queryKey: ['connections'],
        queryFn: getMyConnections,
    });
}

export function useRequestConnection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: requestConnection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['connections'] });
        },
    });
}
