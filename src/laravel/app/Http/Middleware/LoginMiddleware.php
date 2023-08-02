<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        session()->put('user_id', '649c0ca38a43f8c5c28b5318');
        session()->put('token', '649c0e13f397e2b93b0bb862|1Q80MexMcGX3c4wiW6cjhzVmrxQcrAuwfXqSr2SV');
        return $next($request);
    }
}
