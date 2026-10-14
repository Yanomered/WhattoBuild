<?php

use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BuildController;

Route::apiResource('products', ProductsController::class);
Route::apiResource('builds', BuildController::class)->except(['show']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
