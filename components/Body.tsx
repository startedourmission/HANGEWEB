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
  const form = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // 업로드된 이미지 URL 상태 추가

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    console.log('Submitting:', data);

    try {
      const formData = new FormData();
      formData.append('image', data.image);

      const res = await fetch('https://f79d-104-196-228-208.ngrok-free.app/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
      throw new Error('Failed to upload image');
    }

    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);
    setUploadedImageUrl(imageUrl); // 이미지 URL로 설정
    toast.success('Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading image:', error);
    toast.error('Failed to upload image');
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
                            field.onChange(file); // 파일 객체를 그대로 전달
                          }
                        }}
                      />
                      </FormControl>
                      <FormDescription>
                        Please upload an image. The preview will be shown below.
                      </FormDescription>

                      {field.value && (
                        <div className="mt-4">
                        <img src={URL.createObjectURL(field.value)} alt="Uploaded preview" className="w-full h-auto" />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center max-w-[200px] mx-auto w-full"
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

          {/* 서버 응답으로 받은 이미지 URL을 표시 */}
          {uploadedImageUrl && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Uploaded Image Result:</h2>
              <img src={uploadedImageUrl} alt="Uploaded Image Result" className="w-full h-auto" />
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;