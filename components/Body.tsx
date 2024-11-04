'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LoadingDots from '@/components/ui/loadingdots';
import { toast, Toaster } from 'react-hot-toast';

interface FormValues {
  image: string | ArrayBuffer | null;
}

const Body = () => {
  const form = useForm<FormValues>(); // 폼 라이브러리에서 제공하는 훅 사용
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    console.log('Submitting:', data); // 이 줄을 추가해 보세요.


    try {
      const formData = new FormData();
      formData.append('image', data.image as string); // 파일 데이터 추가

      const res = await fetch('https://4b57-34-16-165-67.ngrok-free.app/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      setResponse(result.message || 'Success');
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Upload your image</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                {
                  <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image </FormLabel>
                      <FormControl>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                field.onChange(reader.result); // 파일을 form 필드에 저장
                              };
                              reader.readAsDataURL(file); // 파일을 base64로 변환
                              
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Please upload an image. The preview will be shown below.
                      </FormDescription>
                
                      {field.value && (
                        <div className="mt-4">
                          <img src={field.value as string} alt="Uploaded preview" className="w-full h-auto" />
                        </div>
                      )}
                
                      <FormMessage />
                    </FormItem>
                  )}
                />
                }

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center
                 max-w-[200px] mx-auto w-full"
                >
                  {isLoading ? (
                    <LoadingDots color="white" />
                  ) : response ? (
                    '✨ Regenerate'
                  ) : (
                    'Generate !'
                  )}
                </Button>

              </div>
            </form>
          </Form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
