<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Build;

class BuildController extends Controller
{
    public function index()
    {
        return Build::with('user:id,name')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'difficulty' => 'required|string|max:255',
        ]);

        $build = Build::create($validated);

        return response()->json($build, 201);
    }

    public function update(Request $request, Build $build)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|required|string|max:255',
            'difficulty' => 'sometimes|required|string|max:255',
        ]);

        $build->update($validated);

        return response()->json($build->load('user:id,name'));
    }

    public function destroy(Build $build)
    {
        $build->delete();

        return response()->json([
            'message' => 'Build suggestion deleted successfully.',
        ]);
    }
}
