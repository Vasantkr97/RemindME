"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Collection } from '@prisma/client';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, createTaskSchemaType } from '@/schema/createTask';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { CollectionColor, CollectionColors } from '@/lib/contants';
import { ReloadIcon } from '@radix-ui/react-icons';
import { createTask } from '@/actions/task';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
    open: boolean;
    collection: Collection;
    setOpen: (open: boolean) => void;
}

const CreateTaskDialog = ({ open, collection, setOpen }: Props) => {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<createTaskSchemaType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            collectionId: collection.id,
        },
    })
    
    const openChangeWrapper = (value: boolean) => {
        setOpen(value);
        form.reset();
    }

    const onSubmit = async (data:createTaskSchemaType) => {
        try {
            await createTask(data);
            toast({
                title: "Success",
                description: "Task created Successfully!!",
            });
            openChangeWrapper(false)
            router.refresh();
        } catch(e: any) {
            toast({
                title: "Error",
                description: "Cannot create task",
                variant: "destructive",
            });
        }
        

    }

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
        <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
                <DialogTitle className='flex gap-2'>
                    Add task to collection:
                </DialogTitle>
                <span className={cn(
                    "p-[1px] bg-clip-text text-transparent"
                )}>
                    {collection.name}
                </span>
                <DialogDescription>
                    Add a task to your collection. You can add as many tasks as you want to a collection.
                </DialogDescription>
            </DialogHeader>
            <div className='gap-4 py-4'>
                <Form {...form}>
                    <form className='space-y-4 flex flex-col' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="content"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            rows={5} 
                                            placeholder='Task content here' 
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="expiresAt"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Expires at</FormLabel>
                                    <FormDescription>
                                        When should this task expire?
                                    </FormDescription>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "justify-start text-left font-normal w-full",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                   <CalendarIcon className='mr-2 h-4 w-4' />
                                                   {field.value ? field.value.toLocaleDateString() : ""}
                                                   {!field.value && <span>No expiration</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar 
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <DialogFooter>
                <Button 
                    disabled={form.formState.isSubmitting}
                    className={cn(
                    "w-full dark:text-white text-white",
                    CollectionColors[collection.color as CollectionColor],
                )}
                onClick={form.handleSubmit(onSubmit)}> 
                    Confirm
                    {form.formState.isSubmitting && (
                            <ReloadIcon className="animate-spin h-4 w-4 ml-2" />
                        )
                    }
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog