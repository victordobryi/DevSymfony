import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { FormValues, schema } from '@/types/fact';
import { useNavigate } from 'react-router-dom';

export const FactForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      type: 'math',
      number: '',
      useRandom: false,
    },
    resolver: zodResolver(schema),
  });

  const useRandom = watch('useRandom');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const number = data.useRandom ? 'random' : data.number!;
    navigate('/result', { state: { type: data.type, number } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-full'>
      <div>
        <Label className='mb-2 block text-indigo-700'>Тип:</Label>
        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='border-indigo-300 w-full'>
                <SelectValue placeholder='Выберите тип' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='math'>Math</SelectItem>
                <SelectItem value='trivia'>Trivia</SelectItem>
                <SelectItem value='date'>Date</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && <p className='mt-1 text-sm text-red-500'>{errors.type.message}</p>}
      </div>

      <div>
        <Label htmlFor='number' className='mb-2 block text-indigo-700'>
          Число:
        </Label>
        <Input
          {...register('number')}
          disabled={useRandom}
          id='number'
          placeholder='Введите число'
          className={`border-indigo-300 ${useRandom ? 'bg-gray-100' : ''}`}
        />
        {errors.number && <p className='mt-1 text-sm text-red-500'>{errors.number.message}</p>}
      </div>

      <div className='flex items-center space-x-2'>
        <Controller
          name='useRandom'
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <Label htmlFor='random' className='text-indigo-700'>
          Использовать случайное число
        </Label>
      </div>

      <Button type='submit' className='w-full bg-indigo-600 hover:bg-indigo-700 text-white'>
        Получить факт
      </Button>
    </form>
  );
};
