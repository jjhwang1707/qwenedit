-- Create the images table
CREATE TABLE public.images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    original_image_url TEXT NOT NULL,
    decomposed_state JSONB DEFAULT '{}'::jsonb,
    final_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view their own images" 
    ON public.images FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own images" 
    ON public.images FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images" 
    ON public.images FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create Storage Bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('qwenedit-images', 'qwenedit-images', true);

-- Storage RLS
CREATE POLICY "Users can upload their own images to storage"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'qwenedit-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own images in storage"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'qwenedit-images');