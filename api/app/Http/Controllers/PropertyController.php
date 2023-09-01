<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;

class PropertyController extends Controller
{
    public function search(Request $request)
    {
        // Start with a query builder for the Property model
        $query = Property::query();

        // Filter by property name (partial match)
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        // Filter by exact bedroom count
        if ($request->has('bedrooms')) {
            $query->where('bedrooms', $request->input('bedrooms'));
        }

        // Filter by exact bathroom count
        if ($request->has('bathrooms')) {
            $query->where('bathrooms', $request->input('bathrooms'));
        }

        // Filter by exact storey count
        if ($request->has('storeys')) {
            $query->where('storeys', $request->input('storeys'));
        }

        // Filter by exact garage count
        if ($request->has('garages')) {
            $query->where('garages', $request->input('garages'));
        }

        // Filter by price range
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->input('min_price'), $request->input('max_price')]);
        }

        // Execute the query and return the results as JSON
        $results = $query->get();

        return response()->json($results);
    }
}
