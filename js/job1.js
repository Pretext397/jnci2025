
var params = {
    ctmid: "7572246",
    pagesize: 2000,
    poscode: "c"
}

function joblist() {
    coapi.getJobList(params, function (data) {
        //取到数据之后的操作
        console.log(data)
        var html = ''
        var job = data.resultbody.joblist
        if (job == undefined || job == []) {
            html = ' <div style="text-align:center;line-height: 100px;">暂无数据</div>'
        } else {
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
                `
            }
        }

        $(".joblist").html(html)
    });

}
$(".job li").click(function () {
    $(this).addClass("on").siblings().removeClass("on")
    var poscode = $(this).attr("poscode")
    params.poscode = poscode
    joblist()
    // console.log(poscode);
}).eq(0).click()

$(document).on("click", ".jobtit", function () {
    //  $(this).next().slideToggle();

    let jobid = $(this).attr("jobid")
    var that = $(this)
    coapi.getJobDetail(jobid, function (data) {
        //取到数据之后的操作
        // console.log(data.resultbody.jobinfo)
        var jobinfo = `
              <div class="jobtxt">${data.resultbody.jobinfo}</div>
              <div class="jobbtn"><a target="_blank" href="https://jobs.51job.com/all/${data.resultbody.jobid}.html"><img src="./images/btn.png" alt=""></a></div>`
        that.next().html(jobinfo)
        that.next().slideToggle();
    });

})