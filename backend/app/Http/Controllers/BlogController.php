<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Exception;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with(['category', 'tags'])
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($blog) {
                $blog->image = $blog->image ? asset($blog->image) : null;
                return $blog;
            });

        return response()->json(['data' => $blogs]);
    }

    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'title' => 'required|string|max:255',
    //         'excerpt' => 'required|string',
    //         'content' => 'required|string',
    //         'author' => 'required|string|max:100',
    //         'author_role' => 'required|string|max:100',
    //         'category_id' => 'required|exists:categories,id',
    //         'tag_ids' => 'nullable|array',
    //         'tag_ids.*' => 'exists:tags,id',
    //         'image_description' => 'nullable|string',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     $data = $validator->validated();
    //     $data['date'] = Carbon::now('Asia/Dhaka');


    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $originalName = $image->getClientOriginalName();
    //         $filename = $originalName;
    //         $counter = 1;
    //         $path = 'blogs/' . $filename;

    //         while (Storage::disk('public')->exists($path)) {
    //             $filename = pathinfo($originalName, PATHINFO_FILENAME) . '_' . $counter . '.' . $image->getClientOriginalExtension();
    //             $path = 'blogs/' . $filename;
    //             $counter++;
    //         }

    //         $path = $image->storeAs('blogs', $filename, 'public');
    //         $data['image'] = Storage::url($path);
    //         \Log::info('Image saved', ['path' => $path, 'url' => $data['image'], 'filename' => $filename]);
    //     }

    //     $blog = Blog::create($data);

    //     if (!empty($data['tag_ids'])) {
    //         $blog->tags()->sync($data['tag_ids']);
    //     }

    //     $blog->load(['category', 'tags']);
    //     if ($blog->image) {
    //         $blog->image = asset($blog->image);
    //     }

    //     return response()->json(['message' => 'Blog created', 'blog' => $blog], 201);
    // }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'author' => 'required|string|max:100',
            'author_role' => 'required|string|max:100',
            'category_id' => 'required|exists:categories,id',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'exists:tags,id',
            'image_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['date'] = Carbon::now('Asia/Dhaka');

        // ✅ Store in public/blog-images manually
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('blog-images'), $imageName); // saved in public/blog-images/
            $data['image'] = asset('blog-images/' . $imageName); // generates full URL like https://example.com/blog-images/filename.jpg
        }

        $blog = Blog::create($data);

        if (!empty($data['tag_ids'])) {
            $blog->tags()->sync($data['tag_ids']);
        }

        $blog->load(['category', 'tags']);

        return response()->json([
            'message' => 'Blog created',
            'blog' => $blog
        ], 201);
    }

    public function show(Blog $blog)
    {
        try {

            $blog->load(['category', 'tags']);

            // Append full image URL if image exists
            if ($blog->image) {
                $blog->image = asset($blog->image);
            }

            return response()->json([
                'success' => true,
                'data' => $blog
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching the blog post'
            ], 500);
        }
    }


    // public function update(Request $request, Blog $blog)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'title' => 'required|string|max:255',
    //         'excerpt' => 'required|string',
    //         'content' => 'required|string',
    //         'author' => 'required|string|max:100',
    //         'author_role' => 'required|string|max:100',
    //         'category_id' => 'required|exists:categories,id',
    //         'tag_ids' => 'nullable|array',
    //         'tag_ids.*' => 'exists:tags,id',
    //         'image_description' => 'nullable|string',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     $data = $validator->validated();
    //     $data['date'] = Carbon::now('Asia/Dhaka');

    //     // Handle image upload
    //     if ($request->hasFile('image')) {
    //         // Delete old image if exists
    //         if ($blog->image) {
    //             // Handle both /storage/... URLs and relative paths (blogs-images/...)
    //             $relativePath = str_starts_with($blog->image, '/storage/')
    //                 ? str_replace('/storage/', '', parse_url($blog->image, PHP_URL_PATH))
    //                 : $blog->image;
    //             Storage::disk('public')->delete($relativePath);
    //         }
    //         $path = $request->file('image')->store('blogs-images', 'public');
    //         $data['image'] = Storage::url($path); // Store URL like /storage/blogs-images/...
    //     }

    //     $blog->update($data);

    //     // Sync tags if provided
    //     if (array_key_exists('tag_ids', $data)) {
    //         $blog->tags()->sync($data['tag_ids'] ?? []);
    //     }

    //     // Load related models and add full image URL
    //     $blog->load(['category', 'tags']);
    //     if ($blog->image) {
    //         $blog->image = asset($blog->image); // Full URL like http://localhost:8000/storage/...
    //     }

    //     return response()->json(['message' => 'Blog updated', 'blog' => $blog], 200);
    // }


public function update(Request $request, Blog $blog)
{
    $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'excerpt' => 'required|string',
        'content' => 'required|string',
        'author' => 'required|string|max:100',
        'author_role' => 'required|string|max:100',
        'category_id' => 'required|exists:categories,id',
        'tag_ids' => 'nullable|array',
        'tag_ids.*' => 'exists:tags,id',
        'image_description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $validator->validated();
    $data['date'] = Carbon::now('Asia/Dhaka');

    // ✅ Handle image upload and delete old image from public/blog-images
    if ($request->hasFile('image')) {
        // Delete old image if exists and is stored under blog-images
        if ($blog->image && str_contains($blog->image, 'blog-images/')) {
            $oldImagePath = public_path(parse_url($blog->image, PHP_URL_PATH));
            if (file_exists($oldImagePath)) {
                @unlink($oldImagePath);
            }
        }

        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->move(public_path('blog-images'), $imageName);
        $data['image'] = asset('blog-images/' . $imageName); // Set full public URL
    }

    $blog->update($data);

    if (array_key_exists('tag_ids', $data)) {
        $blog->tags()->sync($data['tag_ids'] ?? []);
    }

    $blog->load(['category', 'tags']);

    return response()->json([
        'message' => 'Blog updated',
        'blog' => $blog
    ], 200);
}

    public function destroy(Blog $blog)
    {
        // dd($blog->image);

        // Delete image if exists
        if ($blog->image) {
            // Handle both /storage/... URLs and relative paths (blogs-images/...)
            $relativePath = str_starts_with($blog->image, '/storage/')
                ? str_replace('/storage/', '', parse_url($blog->image, PHP_URL_PATH))
                : $blog->image;
            Storage::disk('public')->delete($relativePath);
        }

        // Detach all tags
        $blog->tags()->detach();
        // Delete the blog
        $blog->delete();

        return response()->json(['message' => 'Blog deleted'], 200);
    }
}