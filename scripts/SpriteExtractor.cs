using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
public static class PortfolioSprites {
 static bool Background(Color c) { int hi=Math.Max(c.R,Math.Max(c.G,c.B)),lo=Math.Min(c.R,Math.Min(c.G,c.B)); return hi-lo<32 && lo>65; }
 public static Bitmap Cut(string input,int x,int y,int w,int h) {
  using(var source=new Bitmap(input)) {
   var b=source.Clone(new Rectangle(x,y,w,h),PixelFormat.Format32bppArgb);
   var remove=new bool[w*h];var q=new Queue<int>();
   for(int py=0;py<h;py++)for(int px=0;px<w;px++)if(px==0||py==0||px==w-1||py==h-1) {int n=py*w+px;if(Background(b.GetPixel(px,py))&&!remove[n]){remove[n]=true;q.Enqueue(n);}}
   while(q.Count>0){int p=q.Dequeue(),px=p%w,py=p/w;for(int dy=-1;dy<=1;dy++)for(int dx=-1;dx<=1;dx++){int nx=px+dx,ny=py+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;int n=ny*w+nx;if(!remove[n]&&Background(b.GetPixel(nx,ny))){remove[n]=true;q.Enqueue(n);}}}
   for(int py=0;py<h;py++)for(int px=0;px<w;px++)if(remove[py*w+px])b.SetPixel(px,py,Color.Transparent);
   var seen=new bool[w*h];var largest=new List<int>();
   for(int i=0;i<w*h;i++){if(seen[i]||b.GetPixel(i%w,i/w).A==0)continue;var group=new List<int>();q.Enqueue(i);seen[i]=true;
    while(q.Count>0){int p=q.Dequeue();group.Add(p);int px=p%w,py=p/w;for(int dy=-1;dy<=1;dy++)for(int dx=-1;dx<=1;dx++){int nx=px+dx,ny=py+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;int n=ny*w+nx;if(!seen[n]&&b.GetPixel(nx,ny).A>0){seen[n]=true;q.Enqueue(n);}}}
    if(group.Count>largest.Count)largest=group;
   }
   var keep=new bool[w*h];foreach(int p in largest)keep[p]=true;
   for(int py=0;py<h;py++)for(int px=0;px<w;px++)if(!keep[py*w+px])b.SetPixel(px,py,Color.Transparent);
   for(int py=0;py<h;py++)for(int px=0;px<w;px++){var c=b.GetPixel(px,py);int hi=Math.Max(c.R,Math.Max(c.G,c.B)),lo=Math.Min(c.R,Math.Min(c.G,c.B));if(lo>85&&hi<225&&hi-lo<24)b.SetPixel(px,py,Color.Transparent);} return b;
  }
 }
 public static void SaveCrop(string input,string output,int x,int y,int w,int h){using(var b=Cut(input,x,y,w,h))b.Save(output,ImageFormat.Png);}
 public static void Robot(string input,string dir){
  using(var full=Cut(input,8,16,400,752)){
   Point[] points={new Point(282,315),new Point(315,265),new Point(390,250),new Point(400,330),new Point(360,413),new Point(305,425),new Point(268,382)};
   using(var path=new GraphicsPath())using(var body=new Bitmap(400,752))using(var arm=new Bitmap(400,752)){
    path.AddPolygon(points);
    using(var g=Graphics.FromImage(body)){g.SetClip(path,CombineMode.Exclude);g.DrawImageUnscaled(full,0,0);}
    using(var g=Graphics.FromImage(arm)){g.SetClip(path);g.DrawImageUnscaled(full,0,0);}
    body.Save(System.IO.Path.Combine(dir,"body.png"),ImageFormat.Png);arm.Save(System.IO.Path.Combine(dir,"right-arm.png"),ImageFormat.Png);
   }
  }
  string[] names={"normal","talk","happy","cool","excited"};int[] offsets={0,388,789,1178,1579};
  for(int i=0;i<names.Length;i++)using(var sheet=new Bitmap(input))using(var face=new Bitmap(400,752))using(var g=Graphics.FromImage(face)){
   g.DrawImage(sheet,new Rectangle(113,228,170,72),new Rectangle(121+offsets[i],244,170,72),GraphicsUnit.Pixel);
   face.Save(System.IO.Path.Combine(dir,"face-"+names[i]+".png"),ImageFormat.Png);
  }
 }
}

