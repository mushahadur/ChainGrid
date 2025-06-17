<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Tag;

class CategoryTagSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'All',
            'Technology',
            'Tutorials',
            'Education',
            'Security',
            'Environment',
            'DeFi',
        ];

        $tags = [
            'Blockchain',
            'Mining',
            'Web3',
            'Cryptocurrency',
            'Security',
            'Hardware',
            'Optimization',
            'DeFi',
            'Sustainability',
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }

        foreach ($tags as $tag) {
            Tag::create(['name' => $tag]);
        }
    }
}