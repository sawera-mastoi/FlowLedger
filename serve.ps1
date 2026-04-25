$p=3000
$l=[Net.HttpListener]::new()
$l.Prefixes.Add("http://localhost:3000/")
$l.Start()
Write-Host "Listening on http://localhost:3000"
while($l.IsListening){
    try {
        $c=$l.GetContext()
        $r=$c.Response
        $u=$c.Request.Url.LocalPath.TrimStart('/','\')
        if(!$u){$u='index.html'}
        $f=Join-Path "d:\Alee Projcets\stacks april\packages\flowledger-dapp" $u
        if(Test-Path $f){
            $b=[IO.File]::ReadAllBytes($f)
            $r.ContentLength64=$b.Length
            $r.OutputStream.Write($b,0,$b.Length)
        }else{
            $r.StatusCode=404
        }
        $r.Close()
    } catch {
        Write-Host "Error serving request: $_"
    }
}
