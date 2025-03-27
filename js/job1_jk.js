var params = {
  ctmid: "8454839",
  pagesize: "",
  // poscode:"a"
};
var job = []
function filterAndSortJobsByPrefix(prefix) {
  const filteredJobs = job.filter((job) =>
    job.poscode.startsWith(`${prefix}-`)
  );
  filteredJobs.sort((a, b) => {
    const numA = parseInt(a.poscode.split("-")[1]);
    const numB = parseInt(b.poscode.split("-")[1]);
    return numA - numB;
  });

  return filteredJobs;
}
function joblist(poscode) {
  coapi.getJobList(params, function (data) {
    //取到数据之后的操作
    console.log(data);
    var html = "";
    job = data.resultbody.joblist;
    if (job == undefined || job == []) {
      html =
        ' <div style="text-align:center;line-height: 100px;">暂无数据</div>';
    } else {
      console.log(poscode, "poscode2");
      const job = filterAndSortJobsByPrefix(poscode);
      console.log(job, "过滤数组");
      if (job == undefined  || job.length == 0) {
        console.log('7777')
          html =
            ' <div style="text-align:center;line-height: 100px;">暂无数据</div>';
        } else{
          for (k in job) {
            html += `
                    <div class="jobs">
                    <div class="jobtit" jobid="${job[k].jobid}">
                      <span>${job[k].jobname}</span>
                      <span>查看详情<img src="./images/i.png" alt=""></span>
                    </div>
                    <div class="jobinfo">
                      <div class="jobtxt">
                      </div>
                      <div class="jobbtn"> <a href=""><img src="./images/btn.png" alt=""></a></div>
                    </div>
                 </div>
                    `;
          }
        }
     
    }

    $(".joblist").html(html);
  });
}

$(".job li")
  .click(function () {
    $(this).addClass("on").siblings().removeClass("on");
    var poscode = $(this).attr("poscode");
    // params.poscode = poscode
    joblist(poscode);
    // console.log(poscode);
  })
  .eq(0)
  .click();

$(document).on("click", ".jobtit", function () {
  //  $(this).next().slideToggle();

  let jobid = $(this).attr("jobid");
  var that = $(this);
  coapi.getJobDetail(jobid, function (data) {
    console.log( data.resultbody,' data.resultbody')
    data.resultbody.jobinfo = data.resultbody.jobinfo.replace(
      /(专业要求:|资格证书或其他要求:|招聘人数:|岗位职责:|专业要求：|资格证书或其他要求：|招聘人数：|岗位职责：|岗位要求：|职位要求：)/gm,
      "<b>$1</b>"
    );
    var jobinfo = `
        <div class="jobinfobk">
         <p><b>学历要求：</b></p>
         ${data.resultbody.degreefrom}
         <p><b>招聘人数：</b></p>
         ${data.resultbody.jobnum}人
        <div class="jobtxt">${data.resultbody.jobinfo}</div>
        <div class="jobbtn"><a href="http://xyz.51job.com/external/apply.aspx?jobid=${data.resultbody.jobid}&ctmid=8454839"><img src="./images/btn.png" alt=""></a></div>
        </div>
        `;
    that.next().html(jobinfo);
    that.next().slideToggle();
  });
});
